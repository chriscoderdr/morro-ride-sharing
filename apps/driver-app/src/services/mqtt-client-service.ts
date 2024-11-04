import * as Notifications from 'expo-notifications';
import { Client, Message } from 'paho-mqtt';
import { Platform } from 'react-native';
import config from '../config';
import store from '../store';
import { connectFailure, connectSuccess, startConnecting } from '../store/slices/mqtt-slice';
import { setRideRequestWithTimeout } from '../store/slices/ride-request-slice';

class MQTTClientService {
  private client: Client;
  private reconnectInterval: NodeJS.Timeout | null = null;

  constructor(clientId: string) {
    this.client = new Client(
      config.MQTT_BROKER_URL,
      Number(config.MQTT_PORT),
      clientId
    );

    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  }

  connect = (onSuccess: () => void, onFailure: (error: Error) => void) => {
    store.dispatch(startConnecting());
    this.client.connect({
      useSSL: false,
      timeout: 500,
      onSuccess: () => {
        console.log('Connected to MQTT broker');
        this.clearReconnectInterval();
        onSuccess();
        this.subscribeToRideRequests(this.getDriverId());
      },
      onFailure: (error: any) => {
        console.error('Failed to connect to MQTT broker:', error);
        store.dispatch(connectFailure(error.errorMessage));
        this.scheduleReconnect();
        onFailure(error);
      }
    });
  };

  private scheduleReconnect = () => {
    if (this.reconnectInterval) return; // Prevent multiple intervals

    this.reconnectInterval = setInterval(() => {
      console.log('Attempting to reconnect to MQTT broker...');
      this.connect(
        () => {
          console.log('Reconnected successfully.');
          this.subscribeToRideRequests(this.getDriverId());
        },
        (error) => {
          console.error('Reconnection attempt failed:', error);
        }
      );
    }, 5000); // Retry every 5 seconds
  };

  private clearReconnectInterval = () => {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
  };

  getDriverId() {
    const driverId = store.getState().auth.driverId as string;
    console.log(` driverId: ${driverId}`);
    return driverId;
  }

  hasDriverId() {
    return this.getDriverId().length > 0;
  }

  getAccessToken() {
    return store.getState().auth.accessToken as string;
  }

  getTopic(topic: string) {
    switch (topic) {
      case 'ride_requests':
        return (config.MQTT_TOPIC_RIDE_REQUESTS + '').replaceAll(
          ':driver_id',
          this.getDriverId()
        );
      case 'driver_location':
        const topic = (config.MQTT_TOPIC_DRIVER_LOCATION + '').replaceAll(
          ':driver_id',
          this.getAccessToken()
        );
        console.log(
          `topic: ${topic} | debug | driver_id: ${this.getDriverId()} | template: ${
            config.MQTT_TOPIC_DRIVER_LOCATION
          }`
        );
        return topic;
      default:
        return '';
    }
  }

  subscribeToRideRequests = (accessToken: string = '') => {
    console.log(`Trying to subscribe to ride requests`);

    if (accessToken.length > 0 && this.hasDriverId()) {
      const topic = this.getTopic('ride_requests');
      this.client.subscribe(topic, {
        onSuccess: () => {
          console.log('Subscribed to MQTT topic:', topic);
          store.dispatch(connectSuccess());
        },
        onFailure: (error: any) => {
          console.error('Failed to subscribe to MQTT topic:', error);
          store.dispatch(connectFailure(error.errorMessage));
          this.scheduleReconnect();
        }
      });
    }
  };

  onConnectionLost = (responseObject: {
    errorCode: number;
    errorMessage?: string;
  }) => {
    if (responseObject.errorCode !== 0) {
      store.dispatch(connectFailure(responseObject.errorMessage as string));
      console.error('MQTT connection lost:', responseObject.errorMessage);
      this.scheduleReconnect();
    }
  };

  onMessageArrived = (message: Message) => {
    console.log('Message received:', message.payloadString);
    const rideRequest = JSON.parse(message.payloadString);

    Notifications.setNotificationChannelAsync('new-ride-request', {
      name: 'New Ride Request',
      importance: Notifications.AndroidImportance.HIGH
    });
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
      })
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'You got a new ride request',
        body: `Pickup location: ${rideRequest.pickupLocation.address}`,
        sound: Platform.OS === 'android' ? undefined : 'default'
      },
      trigger: {
        channelId: 'new-ride-request'
      }
    })
      .then((notificationId) => {
        console.log(notificationId);
      })
      .catch((error) => {
        console.error(error);
      });

    store.dispatch(
      setRideRequestWithTimeout({
        riderName: '',
        riderPhone: '',
        rideRequestId: rideRequest.rideRequestId,
        estimatedPrice: rideRequest.estimatedPrice,
        pickupTimeDistance: rideRequest.pickupTimeDistance,
        pickupLocation: {
          latitude: rideRequest.pickupLocation.latitude,
          longitude: rideRequest.pickupLocation.longitude,
          address: rideRequest.pickupLocation.address
        },
        tripTimeDistance: rideRequest.tripTimeDistance,
        tripLocation: {
          latitude: rideRequest.tripLocation.latitude,
          longitude: rideRequest.tripLocation.longitude,
          address: rideRequest.tripLocation.address
        }
      })
    );
  };

  publishLocation = (
    latitude: number,
    longitude: number,
    accessToken: string
  ) => {
    if (
      this.client.isConnected() &&
      accessToken.length > 0 &&
      this.hasDriverId()
    ) {
      console.log(
        `Publishing location ${latitude} ${longitude} ${accessToken}`
      );
      const payload = JSON.stringify({
        latitude,
        longitude,
        isAvailable: true,
        timestamp: new Date().getTime()
      });
      const message = new Message(payload);
      message.destinationName = this.getTopic('driver_location');
      this.client.send(message);
      console.log('Published location to MQTT:', payload);
    } else {
      console.error('Cannot publish: MQTT client is not connected');
    }
  };

  disconnect = () => {
    if (this.client.isConnected()) {
      this.client.disconnect();
      console.log('Disconnected from MQTT broker');
    }
    this.clearReconnectInterval(); // Clear any pending reconnection attempts
  };

  isConnected = () => {
    return this.client.isConnected();
  };
}

export default MQTTClientService;

import * as Notifications from 'expo-notifications';
import { Client, Message } from 'paho-mqtt';
import { Platform } from 'react-native';
import config from '../config';
import store from '../store';
import { connectFailure, connectSuccess } from '../store/slices/mqtt-slice';
import { setRideRequestWithTimeout } from '../store/slices/ride-request-slice';

class MQTTClientService {
  private client: Client;
  private isSuscribed: boolean = false;

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
    this.client.connect({
      useSSL: false,
      timeout: 3000,
      onSuccess: () => {
        console.log('Connected to MQTT broker');
        store.dispatch(connectSuccess());
        onSuccess();
      },
      onFailure: (error: any) => {
        store.dispatch(connectFailure(error.errorMessage));
        console.error('Failed to connect to MQTT broker:', error);
        onFailure(error);
      }
    });
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
          `topic: ${topic} | debug | driver_id: ${this.getDriverId()} | templat: ${
            config.MQTT_TOPIC_DRIVER_LOCATION
          }`
        );
        return topic;
      default:
        return '';
    }
  }

  subscribeToRideRequests = (accessToken: string = '') => {
    console.log(`trying to subscribe to ride requests`);
    console.log(
      `isSuscribed: ${
        this.isSuscribed
      } |  accessToken: ${accessToken} | hasDriverId: ${this.hasDriverId()}`
    );
    if (!this.isSuscribed && accessToken.length > 0 && this.hasDriverId()) {
      const topic = this.getTopic('ride_requests');
      this.client.subscribe(topic, {
        onSuccess: () => {
          this.isSuscribed = true;
          console.log('Subscribed to MQTT topic:', topic);
        },
        onFailure: (error: any) => {
          this.isSuscribed = false;
          console.error('Failed to subscribe to MQTT topic:', error);
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
      console.log(`${JSON.stringify(config)}`);
      console.error('MQTT connection lost:', responseObject.errorMessage);
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
        title: 'You got a new ride requests',
        body: `Pickup location: ${rideRequest.pickupLocation.address}`,
        sound: Platform.OS == 'android' ? undefined : 'default'
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
      this.subscribeToRideRequests(accessToken);
      console.log(
        `publishing location ${latitude} ${longitude} ${accessToken}`
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
  };

  isConnected = () => {
    return this.client.isConnected();
  };
}

export default MQTTClientService;

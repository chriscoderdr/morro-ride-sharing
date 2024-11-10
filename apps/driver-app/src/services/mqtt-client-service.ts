import * as Notifications from 'expo-notifications';
import { Client, Message } from 'paho-mqtt';
import { Platform } from 'react-native';
import config from '../config';
import store from '../store';
import {
  connectFailure,
  connectSuccess,
  startConnecting
} from '../store/slices/mqtt-slice';
import { setRideRequestWithTimeout } from '../store/slices/ride-request-slice';

class MQTTClientService {
  private client: Client;
  private reconnectInterval: NodeJS.Timeout | null = null;
  private retryAttempts = 0;
  private maxRetryAttempts = 5;

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
    console.log(`Connecting to MQTT broker at ${config.MQTT_BROKER_URL}...`);
    this.client.connect({
      useSSL: false,
      keepAliveInterval: 30,
      timeout: 10000,
      onSuccess: () => {
        this.clearReconnectInterval();
        onSuccess();
        this.subscribeToRideRequests();
      },
      onFailure: (error: any) => {
        store.dispatch(connectFailure(error.errorMessage));
        this.scheduleReconnect();
        onFailure(error);
      }
    });
  };

  private scheduleReconnect = () => {
    if (this.reconnectInterval) return;

    this.reconnectInterval = setInterval(() => {
      store.dispatch(startConnecting());
      this.connect(
        () => console.log('Reconnected successfully.'),
        (error) => console.error('Reconnection attempt failed:', error)
      );
    }, 5000);
  };

  private clearReconnectInterval = () => {
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
  };

  private getDriverId = () => store.getState().auth?.user?.driverId as string;

  private hasDriverId = () => this.getDriverId()?.length > 0;

  private getAccessToken = () =>
    store.getState().auth?.user?.accessToken as string;

  private getTopic = (topic: string) => {
    const driverId = this.getDriverId();
    const accessToken = this.getAccessToken();
    if (topic === 'ride_requests') {
      return config.MQTT_TOPIC_RIDE_REQUESTS.replace(':driver_id', driverId);
    } else if (topic === 'driver_location') {
      return config.MQTT_TOPIC_DRIVER_LOCATION.replace(
        ':driver_id',
        accessToken
      );
    }
    return '';
  };

  private subscribeToRideRequests = () => {
    if (!this.hasDriverId()) return;

    const topic = this.getTopic('ride_requests');

    this.client.subscribe(topic, {
      onSuccess: () => {
        this.retryAttempts = 0;
        store.dispatch(connectSuccess());
      },
      onFailure: (error: any) => {
        store.dispatch(connectFailure(error.errorMessage));

        if (this.retryAttempts < this.maxRetryAttempts) {
          this.retryAttempts += 1;
          const delay = Math.pow(2, this.retryAttempts) * 1000;
          setTimeout(this.subscribeToRideRequests, delay);
        } else {
          this.scheduleReconnect();
        }
      }
    });
  };

  private onConnectionLost = (responseObject: {
    errorCode: number;
    errorMessage?: string;
  }) => {
    if (responseObject.errorCode !== 0) {
      store.dispatch(
        connectFailure(responseObject.errorMessage || 'Unknown error')
      );
      console.error('MQTT connection lost:', responseObject.errorMessage);
      this.scheduleReconnect();
    }
  };

  private onMessageArrived = (message: Message) => {
    try {
      const rideRequest = JSON.parse(message.payloadString);
      this.showRideRequestNotification(rideRequest);
      this.dispatchRideRequestWithTimeout(rideRequest);
    } catch (error) {
      console.error('Failed to process incoming message:', error);
      setTimeout(() => this.onMessageArrived(message), 1000); // Retry processing message
    }
  };

  private showRideRequestNotification = (rideRequest: any) => {
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
      trigger: { channelId: 'new-ride-request' }
    }).catch((error) => console.error('Notification error:', error));
  };

  private dispatchRideRequestWithTimeout = (rideRequest: any) => {
    store.dispatch(
      setRideRequestWithTimeout({
        createdAt: Date.now(),
        riderName: rideRequest.riderName,
        riderPhone: rideRequest.riderPhone,
        rideRequestId: rideRequest.rideRequestId,
        estimatedPrice: rideRequest.estimatedPrice,
        pickupTimeDistance: rideRequest.pickupTimeDistance,
        pickupLocation: rideRequest.pickupLocation,
        tripTimeDistance: rideRequest.tripTimeDistance,
        tripLocation: rideRequest.tripLocation,
        updatedAt: Date.now()
      })
    );
  };

  publishLocation = (latitude: number, longitude: number) => {
    if (this.hasDriverId()) {
      const payload = JSON.stringify({
        latitude,
        longitude,
        isAvailable: true,
        timestamp: Date.now()
      });
      const message = new Message(payload);
      message.destinationName = this.getTopic('driver_location');
      if (this.client.isConnected()) {
        this.client.send(message);
      }
    } else {
    }
  };

  disconnect = () => {
    if (this.client.isConnected()) {
      this.client.disconnect();
    }
    this.clearReconnectInterval();
  };

  isConnected = () => this.client.isConnected();
}

export default MQTTClientService;

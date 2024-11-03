import {
  MQTT_BROKER_URL,
  MQTT_PORT,
  MQTT_TOPIC,
  MQTT_TOPIC_RIDE_REQUESTS
} from '@/src/config/mqtt-config';
import * as Notifications from 'expo-notifications';
import { Client, Message } from 'paho-mqtt';
import { Platform } from 'react-native';
import store from '../store';
import { setRideRequestWithTimeout } from '../store/slices/ride-request-slice';

class MQTTClientService {
  private client: Client;
  private isSuscribed: boolean = false;

  constructor(clientId: string) {
    console.log(`connection info ${MQTT_BROKER_URL} ${MQTT_PORT} ${clientId}`);
    this.client = new Client(MQTT_BROKER_URL, Number(MQTT_PORT), clientId);

    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  }

  connect = (onSuccess: () => void, onFailure: (error: Error) => void) => {
    this.client.connect({
      useSSL: false,
      timeout: 3000,
      onSuccess: () => {
        console.log('Connected to MQTT broker');
        onSuccess();
      },
      onFailure: (error: any) => {
        console.error('Failed to connect to MQTT broker:', error);
        onFailure(error);
      }
    });
  };

  subscribeToRideRequests = (accessToken: string = '') => {
    if (!this.isSuscribed && accessToken.length > 0) {
      const topic = MQTT_TOPIC_RIDE_REQUESTS.replaceAll(
        '${driver_id}',
        store.getState().auth.driverId as string
      );
      this.isSuscribed = true;
      this.client.subscribe(topic, {
        onSuccess: () => {
          console.log('Subscribed to MQTT topic:', topic);
        },
        onFailure: (error: any) => {
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
      console.error('MQTT connection lost:', responseObject.errorMessage);
    }
  };

  onMessageArrived = (message: Message) => {
    console.log('Message received:', message.payloadString);
    const rideRequest = JSON.parse(message.payloadString);

    Notifications.setNotificationChannelAsync('new-ride-request', {
      name: 'New Ride Request',
      importance: Notifications.AndroidImportance.HIGH
      // No `sound` property here; the default system sound will be used
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
        // sound: 'mySoundFile.wav', // Provide ONLY the base filename
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

    // setTimeout(() => {
    store.dispatch(
      setRideRequestWithTimeout({
        riderName: '',
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
    // }, 1000);
  };

  publishLocation = (
    latitude: number,
    longitude: number,
    accessToken: string
  ) => {
    if (this.client.isConnected() && accessToken.length > 0) {
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
      message.destinationName = MQTT_TOPIC.replaceAll(
        '${driver_id}',
        store.getState().auth.accessToken as string
      );
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

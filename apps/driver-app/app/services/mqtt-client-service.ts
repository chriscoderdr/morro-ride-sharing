import { MQTT_BROKER_URL, MQTT_PORT, MQTT_TOPIC } from "@/config/mqtt-config";
import { Client, Message } from "paho-mqtt";

class MQTTClientService {
  private client: Client;

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
        console.log("Connected to MQTT broker");
        onSuccess();
      },
      onFailure: (error) => {
        console.error("Failed to connect to MQTT broker:", error);
        onFailure(error);   
      },
    });
  };

  onConnectionLost = (responseObject: {
    errorCode: number;
    errorMessage?: string;
  }) => {
    if (responseObject.errorCode !== 0) {
      console.error("MQTT connection lost:", responseObject.errorMessage);
    }
  };

  onMessageArrived = (message: Message) => {
    console.log("Message received:", message.payloadString);
  };

  publishLocation = (latitude: number, longitude: number) => {
    if (this.client.isConnected()) {
      const payload = JSON.stringify({ latitude, longitude });
      const message = new Message(payload);
      message.destinationName = MQTT_TOPIC;
      this.client.send(message);
      console.log("Published location:", payload);
    } else {
      console.error("Cannot publish: MQTT client is not connected");
    }
  };

  disconnect = () => {
    if (this.client.isConnected()) {
      this.client.disconnect();
      console.log("Disconnected from MQTT broker");
    }
  };

  isConnected = () => {
    return this.client.isConnected();
  }
}

export default MQTTClientService;
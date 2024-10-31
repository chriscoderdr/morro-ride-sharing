import MQTTClient from "../services/mqtt-client-service";

let mqttClientInstance: MQTTClient | null = null;

const getMQTTClient = () => {
  if (!mqttClientInstance) {
    mqttClientInstance = new MQTTClient("unique-client-id"); // TODO: Change this to a JWT token
  }
  return mqttClientInstance;
};

export default getMQTTClient;

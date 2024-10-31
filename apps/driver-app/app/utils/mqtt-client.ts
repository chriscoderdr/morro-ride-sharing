import MQTTClient from "../services/mqtt-client-service";

let mqttClientInstance: MQTTClient | null = null;

const getMQTTClient = () => {
  if (!mqttClientInstance) {
    mqttClientInstance = new MQTTClient("unique-client-id");
  }
  return mqttClientInstance;
};

export default getMQTTClient;

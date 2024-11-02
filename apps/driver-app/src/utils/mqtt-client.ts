import MQTTClient from '@/src/services/mqtt-client-service';

let mqttClientInstance: MQTTClient | null = null;

const generateUniqueClientId = () => {
  return `driver-app-${new Date().getTime()}`;
};

const getMQTTClient = () => {
  if (!mqttClientInstance) {
    mqttClientInstance = new MQTTClient(generateUniqueClientId());
  }
  return mqttClientInstance;
};

export default getMQTTClient;

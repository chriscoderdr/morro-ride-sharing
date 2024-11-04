import getMQTTClient from '@/src/utils/mqtt-client';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error('Location Task Error:', error);
    return;
  }

  if (data) {
    const { locations } = data as any;
    const { latitude, longitude } = locations[0].coords;
    const mqttClient = getMQTTClient();

    if (!mqttClient.isConnected()) {
      // TODO: send data to api is mqtt is not connected
    }
  }
});

export { LOCATION_TASK_NAME };

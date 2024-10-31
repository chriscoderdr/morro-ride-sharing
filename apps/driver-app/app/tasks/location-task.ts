import getMQTTClient from "@/utils/mqtt-client"; // Adjust path as necessary
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations }: any = data;
    const { latitude, longitude } = locations[0].coords;

    const mqttClient = getMQTTClient(); // Access the shared MQTT client instance
    if (mqttClient.isConnected()) {
      mqttClient.publishLocation(latitude, longitude);
      console.log("Published location in background:", latitude, longitude);
    } else {
      console.log("MQTT not connected; location not sent");
    }
  }
});

export { LOCATION_TASK_NAME };

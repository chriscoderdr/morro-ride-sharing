import getMQTTClient from "@/utils/mqtt-client"; // Adjust the path as necessary
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Location Task Error:", error);
    return;
  }

  if (data) {
    const { locations } = data as any;
    const { latitude, longitude } = locations[0].coords;
    const mqttClient = getMQTTClient(); // Access the singleton MQTT client instance
    console.log(`Received new locations: ${latitude}, ${longitude}`);

    // Only send location if MQTT client is not connected
    console.log("MQTT Client Status:", mqttClient.isConnected());
    if (!mqttClient.isConnected()) {
      console.log("Published location (api):", latitude, longitude);
    } else {
      console.log("MQTT is connected; location data not sent");
    }
  }
});

export { LOCATION_TASK_NAME };

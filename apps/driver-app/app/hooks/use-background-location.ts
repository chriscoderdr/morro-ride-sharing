import { LOCATION_TASK_NAME } from "@/tasks/location-task";
import getMQTTClient from "@/utils/mqtt-client"; // Adjust the path as necessary
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useBackgroundLocation = () => {
  const [isMQTTConnected, setIsMQTTConnected] = useState(false);
  const mqttClient = getMQTTClient();

  useEffect(() => {
    // Connect MQTT client and update connection status
    mqttClient.connect(
      () => {
        console.log("MQTT Connected!");
        setIsMQTTConnected(true);
      },
      (error) => {
        console.error("MQTT Connection Error:", error);
        setIsMQTTConnected(false);
      }
    );

    // Disconnect MQTT on cleanup
    return () => {
      mqttClient.disconnect();
      setIsMQTTConnected(false);
    };
  }, [mqttClient]);

  useEffect(() => {
    const startBackgroundLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        console.log("Background location permission not granted");
        return;
      }

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 10,
        deferredUpdatesInterval: 1000,
        showsBackgroundLocationIndicator: true,
      });
    };

    startBackgroundLocationTracking();
  }, []);

  return isMQTTConnected;
};

export default useBackgroundLocation;

import useLocationManager from "@/hooks/use-location-manager";
import useMQTTClient from "@/hooks/use-mqtt-client";
import { useEffect } from "react";

const useForegroundLocation = () => {
  const { location } = useLocationManager(false); // Foreground mode, no task name needed
  const { mqttClient, isConnected } = useMQTTClient();

  useEffect(() => {
    // Publish to MQTT whenever location changes and client is connected
    if (location && isConnected) {
      mqttClient.publishLocation(location[1], location[0]); // latitude, longitude
      console.log("Published location to MQTT:", location);
    }
  }, [location, mqttClient, isConnected]);

  return isConnected;
};

export default useForegroundLocation;

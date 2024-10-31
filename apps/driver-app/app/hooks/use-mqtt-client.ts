import getMQTTClient from "@/utils/mqtt-client"; // Adjust the path as necessary
import { useEffect, useState } from "react";

const useMQTTClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const mqttClient = getMQTTClient();

  useEffect(() => {
    // Connect MQTT client and update connection status
    mqttClient.connect(
      () => {
        console.log("MQTT Connected!");
        setIsConnected(true);
      },
      (error) => {
        console.error("MQTT Connection Error:", error);
        setIsConnected(false);
      }
    );

    // Disconnect MQTT on cleanup
    return () => {
      mqttClient.disconnect();
      setIsConnected(false);
    };
  }, [mqttClient]);

  return { mqttClient, isConnected };
};

export default useMQTTClient;

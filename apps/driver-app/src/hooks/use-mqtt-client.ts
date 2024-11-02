import getMQTTClient from "@/src/utils/mqtt-client";
import { useEffect, useState } from "react";

const useMQTTClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const mqttClient = getMQTTClient();

  useEffect(() => {
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

    return () => {
      mqttClient.disconnect();
      setIsConnected(false);
    };
  }, [mqttClient]);

  return { mqttClient, isConnected };
};

export default useMQTTClient;

import MQTTClientService from "@/services/mqtt-client-service";
import { useCallback, useEffect, useState } from "react";

const useLocation = (interval = 10000) => {
  const [isConnected, setIsConnected] = useState(false);
  const client = new MQTTClientService("unique-client-id");

  // Connect to MQTT on mount
  useEffect(() => {
    client.connect(
      () => {
        console.log("MQTT Connected!");
        setIsConnected(true); // Set connection status to true
      },
      (error) => {
        console.error("MQTT Connection Error:", error);
        setIsConnected(false); // Set connection status to false on error
      }
    );

    return () => client.disconnect(); // Clean up connection on unmount
  }, []);

  // Publish location manually
  const publishLocation = useCallback(
    (latitude, longitude) => {
      if (latitude != null && longitude != null) {
        client.publishLocation(latitude, longitude);
        console.log(`Published location: ${latitude}, ${longitude}`);
      } else {
        console.log(`Published location: ${latitude}, ${longitude}`);
        console.warn("Cannot publish: MQTT not connected or coordinates are missing");
      }
    },
    [isConnected]
  );

  return {
    isConnected, // Return the connection status
    publishLocation, // Expose publishLocation function
  };
};

export default useLocation;

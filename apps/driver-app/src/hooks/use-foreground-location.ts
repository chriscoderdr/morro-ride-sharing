import { useEffect } from 'react';
import { useAuthToken } from './use-auth-token';
import useLocationManager from './use-location-manager';
import useMQTTClient from './use-mqtt-client';

const useForegroundLocation = () => {
  const { location } = useLocationManager(false); 
  const { mqttClient, isConnected } = useMQTTClient();
  const accessToken = useAuthToken();

  useEffect(() => {
    if (location && isConnected && accessToken) {
      mqttClient.publishLocation(location[1], location[0], accessToken); 
      console.log(`Published location to MQTT: ${location[0]}, ${location[1]}, accesssToken: ${accessToken}`);
    }
  }, [location, mqttClient, isConnected]);

  return isConnected;
};

export default useForegroundLocation;

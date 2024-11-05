import { useForegroundPermissions } from 'expo-location';
import { useEffect } from 'react';
import { useAuthToken } from './use-auth-token';
import useLocationManager from './use-location-manager';
import useMQTTClient from './use-mqtt-client';

const useForegroundLocation = () => {
  const { location } = useLocationManager(false);
  const { mqttClient, isConnected } = useMQTTClient();
  const accessToken = useAuthToken();
  const [status, _] = useForegroundPermissions();

  useEffect(() => {
    if (
      location &&
      isConnected &&
      accessToken &&
      status?.status === 'granted'
    ) {
      mqttClient.publishLocation(location[1], location[0]);
    }
  }, [location, mqttClient, isConnected, status]);

  return isConnected;
};

export default useForegroundLocation;

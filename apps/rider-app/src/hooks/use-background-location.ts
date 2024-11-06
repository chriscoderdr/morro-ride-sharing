import { LOCATION_TASK_NAME } from '@/src/tasks/location-task';
import { useBackgroundPermissions } from 'expo-location';
import { useEffect } from 'react';
import useLocationManager from './use-location-manager';

const useBackgroundLocation = () => {
  const { startLocationUpdates, stopLocationUpdates } =
    useLocationManager(true);
  const [status, _] = useBackgroundPermissions();

  useEffect(() => {
    if (status?.status === 'granted') {
      startLocationUpdates(LOCATION_TASK_NAME);
    }

    return () => {
      stopLocationUpdates(LOCATION_TASK_NAME);
    };
  }, [startLocationUpdates, status]);

  return null;
};

export default useBackgroundLocation;

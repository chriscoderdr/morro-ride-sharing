import { useEffect } from 'react';
import useLocationManager from './use-location-manager';

const useUserLocation = () => {
  const { location, fetchUserLocation } = useLocationManager(false);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  return { location, fetchUserLocation };
};

export default useUserLocation;

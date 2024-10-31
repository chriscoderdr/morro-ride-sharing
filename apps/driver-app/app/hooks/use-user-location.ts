import useLocationManager from "@/hooks/use-location-manager";
import { useEffect } from "react";

const useUserLocation = () => {
  const { location, fetchUserLocation } = useLocationManager(false); // No background tracking

  useEffect(() => {
    // Fetch location once on component mount
    fetchUserLocation();
  }, [fetchUserLocation]);

  return { location, fetchUserLocation };
};

export default useUserLocation;

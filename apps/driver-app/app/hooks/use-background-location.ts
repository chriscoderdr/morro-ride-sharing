import useLocationManager from "@/hooks/use-location-manager";
import { LOCATION_TASK_NAME } from "@/tasks/location-task";
import { useEffect } from "react";

const useBackgroundLocation = () => {
  const { startLocationUpdates } = useLocationManager(true); // Enable background mode

  useEffect(() => {
    startLocationUpdates(LOCATION_TASK_NAME); // Start background updates
  }, [startLocationUpdates]);

  return null; // No MQTT publishing here
};

export default useBackgroundLocation;

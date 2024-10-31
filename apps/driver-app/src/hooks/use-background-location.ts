import { LOCATION_TASK_NAME } from "@/src/tasks/location-task";
import { useEffect } from "react";
import useLocationManager from "./use-location-manager";

const useBackgroundLocation = () => {
  const { startLocationUpdates } = useLocationManager(true);

  useEffect(() => {
    startLocationUpdates(LOCATION_TASK_NAME);
  }, [startLocationUpdates]);

  return null;
};

export default useBackgroundLocation;

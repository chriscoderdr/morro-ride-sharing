import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

const useLocationManager = (isBackground = false, interval = 3000) => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkPermissions = async (
    isBackground = false,
    shouldRequest = false
  ) => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status !== Location.PermissionStatus.GRANTED) {
      if (shouldRequest) {
        const { status: requestStatus } =
          await Location.requestForegroundPermissionsAsync();
        if (requestStatus !== Location.PermissionStatus.GRANTED) {
          return false;
        }
      } else {
        return false;
      }
    }

    if (isBackground) {
      const { status: backgroundStatus } =
        await Location.getBackgroundPermissionsAsync();
      if (backgroundStatus !== Location.PermissionStatus.GRANTED) {
        if (shouldRequest) {
          const { status: backgroundRequestStatus } =
            await Location.requestBackgroundPermissionsAsync();
          if (backgroundRequestStatus !== Location.PermissionStatus.GRANTED) {
            Alert.alert(
              'Permission denied',
              'Background location permission is required.'
            );
            return false;
          }
        } else {
          return false;
        }
      }
    }

    return true;
  };

  const fetchUserLocation = async () => {
    if (await checkPermissions()) {
      const userLocation = await Location.getCurrentPositionAsync({});
      const coords: [number, number] = [
        userLocation.coords.longitude,
        userLocation.coords.latitude
      ];
      setLocation(coords);
      return coords;
    }
    return null;
  };

  const startLocationUpdates = async (
    taskName: string = 'location-updates'
  ) => {
    if ((await checkPermissions()) && isBackground) {
      await Location.startLocationUpdatesAsync(taskName, {
        accuracy: Location.Accuracy.High,
        timeInterval: interval,
        distanceInterval: 10,
        showsBackgroundLocationIndicator: true
      });
    }
  };

  const stopLocationUpdates = async (taskName: string = 'location-updates') => {
    try {
      setIsStopped(true);
      clearInterval(locationIntervalRef.current);
      await Location.stopLocationUpdatesAsync(taskName);
    } catch (error) {
      console.log('Error stopping location updates', error);
    }
  };

  useEffect(() => {
    if (!isStopped) {
      if (isBackground) {
        startLocationUpdates('background-location-task');
      } else {
        fetchUserLocation();
        locationIntervalRef.current = setInterval(() => {
          fetchUserLocation();
        }, interval);

        return () => {
          clearInterval(locationIntervalRef.current);
        };
      }
    } else {
      return () => {
        clearInterval(locationIntervalRef.current);
        stopLocationUpdates('Location-updates');
      };
    }
  }, [isStopped]);

  return {
    location,
    fetchUserLocation,
    startLocationUpdates,
    stopLocationUpdates
  };
};

export default useLocationManager;

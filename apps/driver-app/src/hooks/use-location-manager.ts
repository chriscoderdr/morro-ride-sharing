import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useLocationManager = (isBackground = false, interval = 60000) => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return false;
    }
    if (isBackground) {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        Alert.alert(
          "Permission denied",
          "Background location permission is required."
        );
        return false;
      }
    }
    return true;
  };

  const fetchUserLocation = async () => {
    if (await requestPermissions()) {
      const userLocation = await Location.getCurrentPositionAsync({});
      const coords: [number, number] = [
        userLocation.coords.longitude,
        userLocation.coords.latitude,
      ];
      setLocation(coords);
      return coords;
    }
    return null;
  };

  const startLocationUpdates = async (taskName: string) => {
    if ((await requestPermissions()) && isBackground) {
      await Location.startLocationUpdatesAsync(taskName, {
        accuracy: Location.Accuracy.High,
        timeInterval: interval,
        distanceInterval: 10,
        showsBackgroundLocationIndicator: true,
      });
    }
  };

  useEffect(() => {
    if (isBackground) {
      startLocationUpdates("background-location-task");
    } else {
      fetchUserLocation();
      const locationInterval = setInterval(() => {
        fetchUserLocation();
      }, interval);

      return () => {
        clearInterval(locationInterval);
      };
    }
  }, [isBackground, interval]);

  return { location, fetchUserLocation, startLocationUpdates };
};

export default useLocationManager;

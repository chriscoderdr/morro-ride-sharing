import useLocation from "@/hooks/use-location-tracking"; // Assuming useLocation hook is in /hooks
import { Ionicons } from "@expo/vector-icons";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const MapScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const cameraRef = useRef<Mapbox.Camera>(null);

  // Use custom useLocation hook
  const { isConnected, publishLocation } = useLocation();

  // Fetch location and update userLocation state
  const fetchUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords: [number, number] = [
      location.coords.longitude,
      location.coords.latitude,
    ];
    setUserLocation(coords);

    // Publish the location manually
    publishLocation(coords[1], coords[0]); // latitude, longitude
  };

  // Zoom into the user's current location
  const handleZoomToUserLocation = () => {
    if (userLocation) {
      cameraRef.current?.flyTo(userLocation, 2000);
    } else {
      Alert.alert("Location Error", "Unable to retrieve user location.");
    }
  };

  // Set interval to update location periodically
  useEffect(() => {
    const locationInterval = setInterval(() => {
      fetchUserLocation();
    }, 10000); // Adjust interval as needed (10s in this example)

    return () => clearInterval(locationInterval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={16}
          // centerCoordinate={userLocation || [-122.400021, 37.789085]} // Default to fallback location
          animationMode="flyTo"
          animationDuration={2000}
        />
        <Mapbox.UserLocation
          visible
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserLocation(coords);
          }}
        />
      </Mapbox.MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={handleZoomToUserLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;

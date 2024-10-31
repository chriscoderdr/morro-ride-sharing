import useUserLocation from "@/src/hooks/use-user-location";
import { Ionicons } from "@expo/vector-icons";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Map() {
  const { location: userLocation, fetchUserLocation } = useUserLocation();
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 16,
        animationDuration: 2000,
      });
      setIsMapInitialized(true);
    }
  }, [userLocation, isMapInitialized]);

  const handleZoomToUserLocation = () => {
    console.log("Zooming to user location...");
    if (userLocation) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 16,
        animationDuration: 2000,
      });
    } else {
      Alert.alert("Location Error", "Unable to retrieve user location.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.UserLocation
          visible
          onUpdate={(location) => {
            const coords: [number, number] = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            fetchUserLocation(); // Refresh location if desired
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
}

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

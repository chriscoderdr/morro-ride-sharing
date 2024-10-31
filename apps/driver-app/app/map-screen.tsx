import { Ionicons } from "@expo/vector-icons";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import MQTTClient from "../services/mqtt-client";

const MapScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const mqttClient = useRef(new MQTTClient("driver-location-client")).current;

  // Connect to MQTT broker on mount and disconnect on unmount
  useEffect(() => {
    mqttClient.connect(
      () => console.log("Connected to MQTT broker"),
      (error) => console.error("Failed to connect to MQTT broker:", error)
    );

    return () => {
      mqttClient.disconnect();
    };
  }, [mqttClient]);

  // Fetch location and publish to MQTT
  const fetchAndPublishLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = [location.coords.longitude, location.coords.latitude];
    setUserLocation(coords);

    mqttClient.publishLocation(coords[1], coords[0]); // Publish latitude and longitude to MQTT
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
      fetchAndPublishLocation();
    }, 10000); // Adjust interval as needed (10s in this example)

    return () => clearInterval(locationInterval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={16}
          centerCoordinate={userLocation || [-122.400021, 37.789085]} // Default to fallback location
          animationMode="flyTo"
          animationDuration={2000}
        />
        <Mapbox.UserLocation
          visible
          onUpdate={(location) => {
            const coords = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            setUserLocation(coords);
          }}
        />
      </Mapbox.MapView>

      <TouchableOpacity style={styles.button} onPress={handleZoomToUserLocation}>
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

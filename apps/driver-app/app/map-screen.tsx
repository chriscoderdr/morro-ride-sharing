import { Ionicons } from "@expo/vector-icons";
import Mapbox from "@rnmapbox/maps";
import React, { useRef, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";


const MapScreen = () => {
  const SF_OFFICE_LOCATION = [-122.400021, 37.789085];
  const [userLocation, setUserLocation] = useState(SF_OFFICE_LOCATION);
  const cameraRef = useRef(null);

  const zoomToUserLocation = () => {
    if (
      userLocation &&
      Array.isArray(userLocation) &&
      userLocation.length === 2
    ) {
      cameraRef.current?.moveTo(userLocation); // FlyTo animation to user location
    } else {
      Alert.alert("Location Error", "Unable to retrieve user location.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={16}
          animationMode="moveTo"
        />
        {Platform.OS !== "web" && (
          <>
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
          </>
        )}
      </Mapbox.MapView>

      <TouchableOpacity style={styles.button} onPress={zoomToUserLocation}>
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

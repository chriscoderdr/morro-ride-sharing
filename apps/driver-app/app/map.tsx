import useUserLocation from '@/src/hooks/use-user-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import RideRequestCard from '@/src/components/ride-request-card';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { acceptRideRequest, RideRequestState } from '@/src/store/slices/ride-request-slice';

export default function Map() {
  const dispatch = useAppDispatch();

  const { location: userLocation, fetchUserLocation } = useUserLocation();
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const rideRequest = useSelector((state: any) => state.rideRequest) as RideRequestState;

  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000
      });
      setIsMapInitialized(true);
    }
  }, [userLocation, isMapInitialized]);

  const handleZoomToUserLocation = () => {
    if (userLocation) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000
      });
    } else {
      Alert.alert('Location Error', 'Unable to retrieve user location.');
    }
  };

  const handleAcceptRide = async () => {
    if (rideRequest.rideRequestId) {
      try {
        await dispatch(acceptRideRequest({ rideRequestId: rideRequest.rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to accept the ride request.');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.LocationPuck
          visible
          topImage="topImage"
          puckBearingEnabled
          pulsing={{
            isEnabled: true,
            color: '#CCCCCC',
            radius: 50.0
          }}
        />
        <Mapbox.Images>
          <Mapbox.Image name="topImage">
            <View
              style={{
                borderColor: '#FFFFFF',
                borderWidth: 2,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MaterialIcons name="navigation" size={30} color="#5588FF" />
            </View>
          </Mapbox.Image>
        </Mapbox.Images>
      </Mapbox.MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={handleZoomToUserLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>

      {rideRequest.status === 'pending' && (
        <RideRequestCard
          rideRequest={rideRequest}
          onAccept={handleAcceptRide}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

import useUserLocation from '@/src/hooks/use-user-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import RideRequestCard from '@/src/components/ride-request-card';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import {
  clearRideRequest,
  RideRequestState
} from '@/src/store/slices/ride-request-slice';
import axios from 'axios';

const getRouteCoordinates = async (
  driverLocation: [number, number],
  pickupLocation: [number, number],
  dropOffLocation: [number, number]
) => {
  console.log(
    `Fetching route from ${driverLocation} to ${pickupLocation} to ${dropOffLocation}`
  );
  const accessToken =
    'sk.eyJ1IjoiY2dvbWV6bWVuZGV6IiwiYSI6ImNtMndhbDAwZjAzMXQyanNkMHF2NjR3bmUifQ.f6E28fydW9bkhLBP7L_lCQ'; // Replace with your Mapbox token
  const startCoords = driverLocation;
  const pickupCoords = pickupLocation;
  const dropoffCoords = dropOffLocation;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?geometries=geojson&access_token=${accessToken}`;
  console.log('HOLA', url);
  try {
    const response = await axios.get(url);
    const { routes } = response.data;

    if (routes && routes.length > 0) {
      return routes[0].geometry.coordinates; // Array of coordinates for the route
    } else {
      throw new Error('No routes found');
    }
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
};

export default function Map() {
  const dispatch = useAppDispatch();
  const [isNavigating, setIsNavigating] = useState(false);
  const { location: userLocation, fetchUserLocation } = useUserLocation();
  const [tripLocations, setTripLocations] = useState<any>();
  const [routeCoordinates, setRouteCoordinates] =
    useState<GeoJSON.LineString | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const rideRequest = useSelector<any>(
    (state) => state.rideRequest
  ) as RideRequestState;
  const startNavigation = () => {
    if (rideRequest.pickupLocation && rideRequest.tripLocation) {
      setIsNavigating(true);
    }
  };
  const handleAcceptRide = async () => {
    if (
      !userLocation ||
      (!rideRequest.tripLocation?.latitude &&
        rideRequest.pickupLocation?.longitude)
    ) {
      return;
    }
    const currentLocation = [userLocation[0], userLocation[1]];
    const pickupLocation = [
      rideRequest.pickupLocation!.longitude,
      rideRequest.pickupLocation!.latitude
    ];
    const dropOffLocation = [
      rideRequest.tripLocation!.longitude,
      rideRequest.tripLocation!.latitude
    ];
    setTripLocations({ pickupLocation, dropOffLocation });
    const coordinates = await getRouteCoordinates(
      currentLocation,
      pickupLocation,
      dropOffLocation
    );

    if (coordinates) {
      const routeGeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      } as any;
      setRouteCoordinates(routeGeoJSON);
      dispatch(clearRideRequest());
    }
  };

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
    console.log('Zooming to user location...');
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
      {rideRequest.isActive && (
        <RideRequestCard
          rideRequest={rideRequest}
          onAccept={() => dispatch(clearRideRequest())}
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

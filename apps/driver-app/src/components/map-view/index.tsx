import { RideRequest } from '@/src/api/models';
import useRoute from '@/src/hooks/use-route';
import { Coordinates } from '@/src/services/map-service';
import { selectCurrentRideRequest } from '@/src/store/slices/ride-request-slice';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

const MapView = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const { route, loading, error, fetchRoute } = useRoute();

  const currentRideRequest = useSelector(selectCurrentRideRequest) as RideRequest | null;
  const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchedRequestIdRef = useRef<string | null>(null);

  const fetchRouteForCurrentRide = () => {
    if (currentRideRequest && currentRideRequest.pickupLocation && currentRideRequest.tripLocation && userLocation) {
      fetchRoute(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: currentRideRequest.pickupLocation.latitude, longitude: currentRideRequest.pickupLocation.longitude },
        { latitude: currentRideRequest.tripLocation.latitude, longitude: currentRideRequest.tripLocation.longitude }
      );
      lastFetchedRequestIdRef.current = currentRideRequest.rideRequestId;
    }
  };

  useEffect(() => {
    if (userLocation != null && (!isMapInitialized || hasRide())) {
      if (hasInProgressRide() || !isMapInitialized) {
        cameraRef.current?.setCamera({
          centerCoordinate: [userLocation.longitude, userLocation.latitude],
          zoomLevel: hasInProgressRide() ? 16 : 12,
          animationDuration: 2000
        });
        setIsMapInitialized(true);
      }

      if (
        currentRideRequest &&
        currentRideRequest.pickupLocation &&
        currentRideRequest.tripLocation &&
        (lastFetchedRequestIdRef.current !== currentRideRequest.rideRequestId ||
          !isMapInitialized)
      ) {
        if (fetchIntervalRef.current) {
          clearInterval(fetchIntervalRef.current);
        }

        fetchRouteForCurrentRide();
        console.log(
          `Fetching route for ride ${currentRideRequest.rideRequestId} | outside`
        );

        fetchIntervalRef.current = setInterval(() => {
          console.log(
            `Fetching route for ride ${currentRideRequest.rideRequestId} | inside`
          );
          fetchRouteForCurrentRide();
        }, 60000);
      }
    }

    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current);
      }
    };
  }, [userLocation, currentRideRequest]);

  const handleZoomToUserLocation = () => {
    if (userLocation) {
      cameraRef.current?.setCamera({
        centerCoordinate: [userLocation.longitude, userLocation.latitude],
        zoomLevel: 12,
        animationDuration: 2000
      });
    } else {
      Alert.alert('Location Error', 'Unable to retrieve user location.');
    }
  };

  const onUserLocationUpdate = (location: Mapbox.Location) => {
    const userLocation = location.coords;
    setUserLocation({
      longitude: userLocation.longitude,
      latitude: userLocation.latitude
    });
  };

  const openNavigationApp = () => {
    if (!currentRideRequest?.pickupLocation || !currentRideRequest?.tripLocation) {
      Alert.alert('Navigation Error', 'No pickup or destination specified');
      return;
    }

    const { latitude: pickupLat, longitude: pickupLng } = currentRideRequest.pickupLocation;
    const { latitude: dropOffLat, longitude: dropOffLng } = currentRideRequest.tripLocation;

    Alert.alert(
      'Choose Navigation App',
      'Select an app to navigate',
      [
        {
          text: 'Google Maps',
          onPress: () =>
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.latitude},${userLocation?.longitude}&waypoints=${pickupLat},${pickupLng}&destination=${dropOffLat},${dropOffLng}&travelmode=driving`
            )
        },
        {
          text: 'Waze',
          onPress: () => {
            Linking.openURL(
              `https://waze.com/ul?ll=${pickupLat},${pickupLng}&navigate=yes`
            );
            setTimeout(() => {
              Linking.openURL(
                `https://waze.com/ul?ll=${dropOffLat},${dropOffLng}&navigate=yes`
              );
            }, 1000);
          }
        }
      ],
      { cancelable: true }
    );
  };

  const hasInProgressRide = () => {
    return currentRideRequest && ['started', 'picked-up'].includes(currentRideRequest.status);
  };

  const hasRide = () => {
    return currentRideRequest !== null;
  };

  return (
    <>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.UserLocation onUpdate={onUserLocationUpdate} />
        <Mapbox.LocationPuck
          visible
          topImage="me"
          puckBearingEnabled
          pulsing={{
            isEnabled: true,
            color: '#CCCCCC',
            radius: 50.0
          }}
        />

        <Mapbox.Images>
          <Mapbox.Image name="me">
            <View style={styles.iconContainer}>
              <MaterialIcons name="navigation" size={30} color="#00AACC" />
            </View>
          </Mapbox.Image>
          <Mapbox.Image name="pickupIcon">
            <View style={styles.iconContainer}>
              <MaterialIcons name="person" size={30} color="#FF5555" />
            </View>
          </Mapbox.Image>
          <Mapbox.Image name="dropoffIcon">
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-pin" size={30} color="#5588FF" />
            </View>
          </Mapbox.Image>
        </Mapbox.Images>

        {currentRideRequest && currentRideRequest.pickupLocation && (
          <Mapbox.ShapeSource
            id="pickupSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  currentRideRequest.pickupLocation.longitude,
                  currentRideRequest.pickupLocation.latitude
                ]
              },
              properties: {
                title: 'Pick-off'
              }
            }}
          >
            <Mapbox.SymbolLayer
              id="pickupSymbol"
              style={{
                iconImage: 'pickupIcon',
                iconSize: 1
              }}
            />
          </Mapbox.ShapeSource>
        )}

        {currentRideRequest && currentRideRequest.tripLocation && (
          <Mapbox.ShapeSource
            id="dropoffSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  currentRideRequest.tripLocation.longitude,
                  currentRideRequest.tripLocation.latitude
                ]
              },
              properties: {
                title: 'Drop-off'
              }
            }}
          >
            <Mapbox.SymbolLayer
              id="dropoffSymbol"
              style={{
                iconImage: 'dropoffIcon',
                iconSize: 1
              }}
            />
          </Mapbox.ShapeSource>
        )}

        {currentRideRequest && route && (
          <Mapbox.ShapeSource id="routeSource" shape={route}>
            <Mapbox.LineLayer
              id="routeLine"
              style={{
                lineWidth: 5,
                lineColor: '#00A8FF'
              }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>

      {currentRideRequest && hasInProgressRide() && (
        <TouchableOpacity
          style={[styles.button, { top: 100 }]}
          onPress={openNavigationApp}
        >
          <Ionicons name="navigate-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleZoomToUserLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default MapView;

import { RideRequest } from '@/src/api/models';
import useRoute from '@/src/hooks/use-route';
import { Coordinates } from '@/src/services/map-service';
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
  const statuses = ['pending', 'accepted', 'started', 'picked-up'];
  const onGoingStatuses = ['started', 'picked-up'];
  const rideRequest = useSelector((state: any) =>
    state.rideRequest.requests
      ? state.rideRequest.requests.filter((r: any) =>
          statuses.includes(r.status)
        )[0]
      : null
  ) as RideRequest;

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
        rideRequest &&
        rideRequest.pickupLocation &&
        rideRequest.tripLocation &&
        hasRide()
      ) {
        fetchRoute(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          },
          {
            latitude: rideRequest.pickupLocation.latitude,
            longitude: rideRequest.pickupLocation.longitude
          },
          {
            latitude: rideRequest.tripLocation.latitude,
            longitude: rideRequest.tripLocation.longitude
          }
        );
      }
    }
  }, [userLocation, isMapInitialized, rideRequest]);

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
    if (!rideRequest?.pickupLocation || !rideRequest?.tripLocation) {
      Alert.alert('Navigation Error', 'No pickup or destination specified');
      return;
    }

    const { latitude: pickupLat, longitude: pickupLng } =
      rideRequest.pickupLocation;
    const { latitude: dropOffLat, longitude: dropOffLng } =
      rideRequest.tripLocation;

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
            // First, navigate to the pickup point
            Linking.openURL(
              `https://waze.com/ul?ll=${pickupLat},${pickupLng}&navigate=yes`
            );

            // Then, after reaching the pickup point, navigate to the drop-off point
            setTimeout(() => {
              Linking.openURL(
                `https://waze.com/ul?ll=${dropOffLat},${dropOffLng}&navigate=yes`
              );
            }, 1000); // Small delay to allow the first URL to open
          }
        }
      ],
      { cancelable: true }
    );
  };

  const hasInProgressRide = () => {
    
    return rideRequest && onGoingStatuses.includes(rideRequest.status)
  };

  const hasRide = () => {
    return rideRequest && statuses.includes(rideRequest.status);
  }

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

        {rideRequest && rideRequest.pickupLocation && (
          <Mapbox.ShapeSource
            id="pickupSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  rideRequest.pickupLocation.longitude,
                  rideRequest.pickupLocation.latitude
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

        {rideRequest && rideRequest.tripLocation && (
          <Mapbox.ShapeSource
            id="dropoffSource"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  rideRequest.tripLocation.longitude,
                  rideRequest.tripLocation.latitude
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

        {rideRequest && route && (
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

      {rideRequest && hasInProgressRide() && (
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

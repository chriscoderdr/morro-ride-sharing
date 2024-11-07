import { Alert, TouchableOpacity, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { Coordinates } from '@mapbox/search-js-core';
import styles from './styles';
import MapView from '../map-view';

const ConfirmRideLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);

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

  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      handleZoomToUserLocation();
      setIsMapInitialized(true);
    }
  }, [userLocation]);

  const onUserLocationUpdate = (location: Mapbox.Location) => {
    const userLocation = location.coords;
    setUserLocation({
      longitude: userLocation.longitude,
      latitude: userLocation.latitude
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        pickup={[121.1217362, 14.1857276]}
        dropoff={[121.122798, 14.175127]}
      />
    </View>
  );
};

export default ConfirmRideLocation;

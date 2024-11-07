import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { Coordinates } from '@mapbox/search-js-core';
import styles from './styles';
import MapImages from './map-images';
import MapPoint from './map-point';

const MapView = ({ pickup, dropoff }) => {
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
    <>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.UserLocation onUpdate={onUserLocationUpdate} />
        <MapImages />
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

        {pickup && (
          <MapPoint
            coordinates={pickup}
            iconImage={'pickupIcon'}
            pointId={'pickup'}
            title={'Pickup'}
          />
        )}
        {dropoff && (
          <MapPoint
            coordinates={dropoff}
            iconImage={'dropoffIcon'}
            pointId={'dropoff'}
            title={'Dropoff'}
          />
        )}
      </Mapbox.MapView>

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

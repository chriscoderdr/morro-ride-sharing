import React from 'react';
import { TouchableOpacity } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useEffect, useRef, useState } from 'react';
import { Coordinates } from '@mapbox/search-js-core';
import styles from './styles';
import MapImages from './map-images';
import MapPoint from './map-point';
import MapRoute from './map-route';
import MapUserLocationPuck from './map-user-location-puck';
import { handleZoomToUserLocation } from '@/src/utils/maps';
import { IMapViewProps } from './props';

const MapView = ({
  pickup,
  dropoff,
  route,
  myLocationButtonStyle,
  points
}: IMapViewProps) => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      handleZoomToUserLocation(userLocation, cameraRef);
      setIsMapInitialized(true);
    }
  }, [userLocation]);

  const onPressMyLocation = () => {
    handleZoomToUserLocation(userLocation, cameraRef);
  };

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
        <MapUserLocationPuck />

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
        {points && points.length > 0
          ? points.map((point) => <MapPoint {...point} key={point.pointId} />)
          : null}
        {route && <MapRoute route={route} />}
      </Mapbox.MapView>

      <TouchableOpacity
        style={[styles.button, myLocationButtonStyle]}
        onPress={onPressMyLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default MapView;

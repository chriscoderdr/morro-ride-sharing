import { forwardRef, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import MapImages from './map-images';
import MapPoint from './map-point';
import MapRoute from './map-route';
import MapUserLocationPuck from './map-user-location-puck';
import { handleZoomToUserLocation } from '../../utils/map';
import { IMapViewProps } from './props';

const MapView = forwardRef<Mapbox.Camera, IMapViewProps>(
  (
    {
      pickup,
      dropoff,
      route,
      myLocationButtonStyle,
      points,
      onUserLocationUpdate,
    }: IMapViewProps,
    ref
  ) => {
    const [userLocation, setUserLocation] = useState<any | null>(null);
    const [isMapInitialized, setIsMapInitialized] = useState(false);
    const cameraRef = useRef<Mapbox.Camera>(null);

    // Attach the forwarded ref to cameraRef
    useEffect(() => {
      if (ref) {
        (ref as React.MutableRefObject<Mapbox.Camera | null>).current =
          cameraRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (userLocation && !isMapInitialized) {
        handleZoomToUserLocation(userLocation, cameraRef);
        setIsMapInitialized(true);
      }
    }, [userLocation]);

    const onPressMyLocation = () => {
      console.log(`onPressMyLocation: ${userLocation} | ${cameraRef}`);
      handleZoomToUserLocation(userLocation, cameraRef);
    };

    const handleOnUserLocationUpdate = (location: Mapbox.Location) => {
      console.log(`onUserLocationUpdate: ${location}`);
      const userLocation = location.coords;
      setUserLocation({
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      });
      if (onUserLocationUpdate) {
        onUserLocationUpdate(userLocation);
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView style={{ flex: 1 }}>
          <Mapbox.Camera ref={cameraRef} />
          <Mapbox.UserLocation onUpdate={handleOnUserLocationUpdate} />
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
      </View>
    );
  }
);

export default MapView;

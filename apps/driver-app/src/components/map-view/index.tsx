import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const MapView = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>();
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);

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

  const onUserLocationUpdate = (location: Mapbox.Location) => {
    const userLocation = location.coords;
    setUserLocation([userLocation.longitude, userLocation.latitude]);
  };

  return (
    <>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.UserLocation onUpdate={onUserLocationUpdate} />
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
    </>
  );
};

export default MapView;

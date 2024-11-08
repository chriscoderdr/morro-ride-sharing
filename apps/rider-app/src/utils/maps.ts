import { Alert } from 'react-native';

const handleZoomToUserLocation = (userLocation, cameraRef) => {
  if (userLocation && cameraRef.current) {
    cameraRef.current?.setCamera({
      centerCoordinate: [userLocation.longitude, userLocation.latitude],
      zoomLevel: 12,
      animationDuration: 2000
    });
  } else {
    Alert.alert('Location Error', 'Unable to retrieve user location.');
  }
};

export { handleZoomToUserLocation };

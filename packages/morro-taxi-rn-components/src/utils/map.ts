import { Alert, Linking } from 'react-native';

const handleZoomToUserLocation = (userLocation: any, cameraRef: any) => {
  if (userLocation && cameraRef.current) {
    cameraRef.current?.setCamera({
      centerCoordinate: [userLocation.longitude, userLocation.latitude],
      zoomLevel: 12,
      animationDuration: 2000,
    });
  } else {
    console.log(
      `Unable to retrieve user location: ${userLocation} | ${cameraRef.current}`
    );
    Alert.alert('Location Error', 'Unable to retrieve user location.');
  }
};

const openNavigationApp = (userLocation: any, pickup: any, dropOff: any) => {
  if (!pickup || !dropOff) {
    Alert.alert('Navigation Error', 'No pickup or destination specified');
    return;
  }

  const { latitude: pickupLat, longitude: pickupLng } = pickup;
  const { latitude: dropOffLat, longitude: dropOffLng } = dropOff;

  Alert.alert(
    'Choose Navigation App',
    'Select an app to navigate',
    [
      {
        text: 'Google Maps',
        onPress: () =>
          Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.latitude},${userLocation?.longitude}&waypoints=${pickupLat},${pickupLng}&destination=${dropOffLat},${dropOffLng}&travelmode=driving`
          ),
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
        },
      },
    ],
    { cancelable: true }
  );
};

export { handleZoomToUserLocation, openNavigationApp };

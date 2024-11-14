"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openNavigationApp = exports.handleZoomToUserLocation = void 0;
var _reactNative = require("react-native");
const handleZoomToUserLocation = (userLocation, cameraRef) => {
  if (userLocation && cameraRef.current) {
    cameraRef.current?.setCamera({
      centerCoordinate: [userLocation.longitude, userLocation.latitude],
      zoomLevel: 12,
      animationDuration: 2000
    });
  } else {
    _reactNative.Alert.alert('Location Error', 'Unable to retrieve user location.');
  }
};
exports.handleZoomToUserLocation = handleZoomToUserLocation;
const openNavigationApp = (userLocation, pickup, dropOff) => {
  if (!pickup || !dropOff) {
    _reactNative.Alert.alert('Navigation Error', 'No pickup or destination specified');
    return;
  }
  const pickupLat = pickup[1];
  const pickupLng = pickup[0];
  const dropOffLat = dropOff[1];
  const dropOffLng = dropOff[0];
  const userLat = userLocation?.latitude;
  const userLng = userLocation?.longitude;
  console.log(`User Location: ${userLat}, ${userLng} | Pickup: ${pickupLat}, ${pickupLng} | Dropoff: ${dropOffLat}, ${dropOffLng}`);
  _reactNative.Alert.alert('Choose Navigation App', 'Select an app to navigate', [{
    text: 'Google Maps',
    onPress: () => _reactNative.Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&waypoints=${pickupLat},${pickupLng}&destination=${dropOffLat},${dropOffLng}&travelmode=driving`)
  }, {
    text: 'Waze',
    onPress: () => {
      _reactNative.Linking.openURL(`https://waze.com/ul?ll=${pickupLat},${pickupLng}&navigate=yes`);
      setTimeout(() => {
        _reactNative.Linking.openURL(`https://waze.com/ul?ll=${dropOffLat},${dropOffLng}&navigate=yes`);
      }, 1000);
    }
  }], {
    cancelable: true
  });
};
exports.openNavigationApp = openNavigationApp;
//# sourceMappingURL=map.js.map
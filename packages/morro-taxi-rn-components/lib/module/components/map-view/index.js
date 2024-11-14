"use strict";

import Ionicons from '@expo/vector-icons/Ionicons';
import Mapbox from '@rnmapbox/maps';
import { forwardRef, useEffect, useRef, useState, createElement as _createElement } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { handleZoomToUserLocation, openNavigationApp } from "../../utils/map.js";
import MapImages from "./map-images.js";
import MapPoint from "./map-point.js";
import MapRoute from "./map-route.js";
import MapUserLocationPuck from "./map-user-location-puck.js";
import styles from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MapView = /*#__PURE__*/forwardRef(({
  pickup,
  dropoff,
  route,
  myLocationButtonStyle,
  points,
  onUserLocationUpdate,
  navigationButtonStyle,
  showNavigationButton = false
}, ref) => {
  const [userLocation, setUserLocation] = useState(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef(null);

  // Attach the forwarded ref to cameraRef
  useEffect(() => {
    if (ref) {
      ref.current = cameraRef.current;
    }
  }, [ref]);
  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      handleZoomToUserLocation(userLocation, cameraRef);
      setIsMapInitialized(true);
    }
  }, [userLocation]);
  const onPressMyLocation = () => {
    handleZoomToUserLocation(userLocation, cameraRef);
  };
  const onPressNavigate = () => {
    if (pickup && dropoff && userLocation) {
      openNavigationApp(userLocation, pickup, dropoff);
    } else {
      Alert.alert('Navigation Error', 'No pickup or destination specified');
    }
  };
  const handleOnUserLocationUpdate = location => {
    const userLocation = location.coords;
    setUserLocation({
      longitude: userLocation.longitude,
      latitude: userLocation.latitude
    });
    if (onUserLocationUpdate) {
      onUserLocationUpdate(userLocation);
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    style: {
      flex: 1
    },
    children: [/*#__PURE__*/_jsxs(Mapbox.MapView, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/_jsx(Mapbox.Camera, {
        ref: cameraRef
      }), /*#__PURE__*/_jsx(Mapbox.UserLocation, {
        onUpdate: handleOnUserLocationUpdate
      }), /*#__PURE__*/_jsx(MapImages, {}), /*#__PURE__*/_jsx(MapUserLocationPuck, {}), pickup && /*#__PURE__*/_jsx(MapPoint, {
        coordinates: pickup,
        iconImage: 'pickupIcon',
        pointId: 'pickup',
        title: 'Pickup'
      }), dropoff && /*#__PURE__*/_jsx(MapPoint, {
        coordinates: dropoff,
        iconImage: 'dropoffIcon',
        pointId: 'dropoff',
        title: 'Dropoff'
      }), points && points.length > 0 ? points.map(point => /*#__PURE__*/_createElement(MapPoint, {
        ...point,
        key: point.pointId
      })) : null, route && /*#__PURE__*/_jsx(MapRoute, {
        route: route
      })]
    }), showNavigationButton && pickup && dropoff && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.navigateButton, navigationButtonStyle],
      onPress: onPressNavigate,
      children: /*#__PURE__*/_jsx(Ionicons, {
        name: "navigate",
        size: 24,
        color: "white"
      })
    }), /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.button, myLocationButtonStyle],
      onPress: onPressMyLocation,
      children: /*#__PURE__*/_jsx(Ionicons, {
        name: "locate",
        size: 24,
        color: "white"
      })
    })]
  });
});
export default MapView;
//# sourceMappingURL=index.js.map
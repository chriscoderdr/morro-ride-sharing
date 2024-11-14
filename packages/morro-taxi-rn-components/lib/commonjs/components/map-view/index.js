"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Ionicons = _interopRequireDefault(require("@expo/vector-icons/Ionicons"));
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _react = require("react");
var _reactNative = require("react-native");
var _map = require("../../utils/map.js");
var _mapImages = _interopRequireDefault(require("./map-images.js"));
var _mapPoint = _interopRequireDefault(require("./map-point.js"));
var _mapRoute = _interopRequireDefault(require("./map-route.js"));
var _mapUserLocationPuck = _interopRequireDefault(require("./map-user-location-puck.js"));
var _styles = _interopRequireDefault(require("./styles.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MapView = /*#__PURE__*/(0, _react.forwardRef)(({
  pickup,
  dropoff,
  route,
  myLocationButtonStyle,
  points,
  onUserLocationUpdate,
  navigationButtonStyle,
  showNavigationButton = false
}, ref) => {
  const [userLocation, setUserLocation] = (0, _react.useState)(null);
  const [isMapInitialized, setIsMapInitialized] = (0, _react.useState)(false);
  const cameraRef = (0, _react.useRef)(null);

  // Attach the forwarded ref to cameraRef
  (0, _react.useEffect)(() => {
    if (ref) {
      ref.current = cameraRef.current;
    }
  }, [ref]);
  (0, _react.useEffect)(() => {
    if (userLocation && !isMapInitialized) {
      (0, _map.handleZoomToUserLocation)(userLocation, cameraRef);
      setIsMapInitialized(true);
    }
  }, [userLocation]);
  const onPressMyLocation = () => {
    (0, _map.handleZoomToUserLocation)(userLocation, cameraRef);
  };
  const onPressNavigate = () => {
    if (pickup && dropoff && userLocation) {
      (0, _map.openNavigationApp)(userLocation, pickup, dropoff);
    } else {
      _reactNative.Alert.alert('Navigation Error', 'No pickup or destination specified');
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      flex: 1
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_maps.default.MapView, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.Camera, {
        ref: cameraRef
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.UserLocation, {
        onUpdate: handleOnUserLocationUpdate
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_mapImages.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_mapUserLocationPuck.default, {}), pickup && /*#__PURE__*/(0, _jsxRuntime.jsx)(_mapPoint.default, {
        coordinates: pickup,
        iconImage: 'pickupIcon',
        pointId: 'pickup',
        title: 'Pickup'
      }), dropoff && /*#__PURE__*/(0, _jsxRuntime.jsx)(_mapPoint.default, {
        coordinates: dropoff,
        iconImage: 'dropoffIcon',
        pointId: 'dropoff',
        title: 'Dropoff'
      }), points && points.length > 0 ? points.map(point => /*#__PURE__*/(0, _react.createElement)(_mapPoint.default, {
        ...point,
        key: point.pointId
      })) : null, route && /*#__PURE__*/(0, _jsxRuntime.jsx)(_mapRoute.default, {
        route: route
      })]
    }), showNavigationButton && pickup && dropoff && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: [_styles.default.navigateButton, navigationButtonStyle],
      onPress: onPressNavigate,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ionicons.default, {
        name: "navigate",
        size: 24,
        color: "white"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: [_styles.default.button, myLocationButtonStyle],
      onPress: onPressMyLocation,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ionicons.default, {
        name: "locate",
        size: 24,
        color: "white"
      })
    })]
  });
});
var _default = exports.default = MapView;
//# sourceMappingURL=index.js.map
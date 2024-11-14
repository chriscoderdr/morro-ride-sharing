"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Location = _interopRequireWildcard(require("expo-location"));
var Notifications = _interopRequireWildcard(require("expo-notifications"));
var _react = require("react");
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PermissionBlocker = ({
  children,
  title = 'Permissions Required',
  subtitle = 'This app requires some permissions to work properly.',
  alertTitle = 'Permissions Required',
  alertSubtitle = 'Please grant the required permissions in your settings.',
  requireLocation = false,
  requireBackgroundLocation = false,
  requireNotification = false
}) => {
  const [permissionsGranted, setPermissionsGranted] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    checkPermissions();
    const subscription = _reactNative.AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      checkPermissions();
    }
  };
  const checkPermissions = async () => {
    try {
      const {
        status: locationStatus
      } = await Location.getForegroundPermissionsAsync();
      const {
        status: backgroundStatus
      } = await Location.getBackgroundPermissionsAsync();
      const {
        status: notificationStatus
      } = await Notifications.getPermissionsAsync();
      const allPermissionsGranted = (!requireLocation || locationStatus === 'granted') && (!requireBackgroundLocation || backgroundStatus === 'granted') && (!requireNotification || notificationStatus === 'granted');
      setPermissionsGranted(allPermissionsGranted);
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRequestPermissions = async () => {
    let permissionDenied = false;
    if (requireNotification) {
      let {
        status: notificationStatus
      } = await Notifications.getPermissionsAsync();
      if (notificationStatus !== 'granted') {
        const {
          status: newNotificationStatus
        } = await Notifications.requestPermissionsAsync();
        notificationStatus = newNotificationStatus;
        if (notificationStatus !== 'granted') permissionDenied = true;
      }
    }
    if (requireLocation) {
      let {
        status: locationStatus
      } = await Location.getForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        const {
          status: newLocationStatus
        } = await Location.requestForegroundPermissionsAsync();
        locationStatus = newLocationStatus;
        if (locationStatus !== 'granted') permissionDenied = true;
      }
    }
    if (requireBackgroundLocation) {
      let {
        status: backgroundStatus
      } = await Location.getBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        const {
          status: newBackgroundStatus
        } = await Location.requestBackgroundPermissionsAsync();
        backgroundStatus = newBackgroundStatus;
        if (backgroundStatus !== 'granted') permissionDenied = true;
      }
    }
    if (permissionDenied) {
      showSettingsAlert();
    } else {
      setPermissionsGranted(true);
    }
  };
  const showSettingsAlert = () => {
    _reactNative.Alert.alert(alertTitle, alertSubtitle, [{
      text: 'Go to Settings',
      onPress: () => _reactNative.Linking.openSettings()
    }, {
      text: 'Cancel',
      style: 'cancel'
    }]);
  };
  if (isLoading) {
    return null;
  }
  if (permissionsGranted) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _styles.styles.overlay,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.title,
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.message,
      children: subtitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: _styles.styles.button,
      onPress: handleRequestPermissions,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _styles.styles.buttonText,
        children: "Grant Permissions"
      })
    })]
  });
};
var _default = exports.default = PermissionBlocker;
//# sourceMappingURL=index.js.map
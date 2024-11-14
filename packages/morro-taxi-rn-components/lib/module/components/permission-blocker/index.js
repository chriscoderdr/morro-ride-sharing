"use strict";

import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, AppState, Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles.js";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    checkPermissions();
    const subscription = AppState.addEventListener('change', handleAppStateChange);
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
    if (requireLocation) {
      const {
        status: locationStatus
      } = await Location.getForegroundPermissionsAsync();
      if (locationStatus === 'denied') {
        permissionDenied = true;
      } else if (locationStatus !== 'granted') {
        const {
          status: newLocationStatus
        } = await Location.requestForegroundPermissionsAsync();
        if (newLocationStatus !== 'granted') permissionDenied = true;
      }
    }
    if (requireBackgroundLocation) {
      const {
        status: backgroundStatus
      } = await Location.getBackgroundPermissionsAsync();
      if (backgroundStatus === 'denied') {
        permissionDenied = true;
      } else if (backgroundStatus !== 'granted') {
        const {
          status: newBackgroundStatus
        } = await Location.requestBackgroundPermissionsAsync();
        if (newBackgroundStatus !== 'granted') permissionDenied = true;
      }
    }
    if (requireNotification) {
      const {
        status: notificationStatus
      } = await Notifications.getPermissionsAsync();
      if (notificationStatus === 'denied') {
        permissionDenied = true;
      } else if (notificationStatus !== 'granted') {
        const {
          status: newNotificationStatus
        } = await Notifications.requestPermissionsAsync();
        if (newNotificationStatus !== 'granted') permissionDenied = true;
      }
    }
    if (permissionDenied) {
      showSettingsAlert();
    } else {
      setPermissionsGranted(true);
    }
  };
  const showSettingsAlert = () => {
    Alert.alert(alertTitle, alertSubtitle, [{
      text: 'Go to Settings',
      onPress: () => Linking.openSettings()
    }, {
      text: 'Cancel',
      style: 'cancel'
    }]);
  };
  if (isLoading) {
    return null;
  }
  if (permissionsGranted) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.overlay,
    children: [/*#__PURE__*/_jsx(Text, {
      style: styles.title,
      children: title
    }), /*#__PURE__*/_jsx(Text, {
      style: styles.message,
      children: subtitle
    }), /*#__PURE__*/_jsx(TouchableOpacity, {
      style: styles.button,
      onPress: handleRequestPermissions,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.buttonText,
        children: "Grant Permissions"
      })
    })]
  });
};
export default PermissionBlocker;
//# sourceMappingURL=index.js.map
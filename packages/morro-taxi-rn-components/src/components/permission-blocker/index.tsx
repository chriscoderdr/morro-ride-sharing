import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import {
  Alert,
  AppState,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IPermissionBlockerProps } from './props';
import { styles } from './styles';

const PermissionBlocker = ({
  children,
  title = 'Permissions Required',
  subtitle = 'This app requires some permissions to work properly.',
  alertTitle = 'Permissions Required',
  alertSubtitle = 'Please grant the required permissions in your settings.',
  requireLocation = false,
  requireBackgroundLocation = false,
  requireNotification = false,
}: IPermissionBlockerProps) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPermissions();
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      checkPermissions();
    }
  };

  const checkPermissions = async () => {
    try {
      const { status: locationStatus } =
        await Location.getForegroundPermissionsAsync();
      const { status: backgroundStatus } =
        await Location.getBackgroundPermissionsAsync();
      const { status: notificationStatus } =
        await Notifications.getPermissionsAsync();

      const allPermissionsGranted =
        (!requireLocation || locationStatus === 'granted') &&
        (!requireBackgroundLocation || backgroundStatus === 'granted') &&
        (!requireNotification || notificationStatus === 'granted');

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
      let { status: notificationStatus } =
        await Notifications.getPermissionsAsync();
      if (notificationStatus !== 'granted') {
        const { status: newNotificationStatus } =
          await Notifications.requestPermissionsAsync();
        notificationStatus = newNotificationStatus;
        if (notificationStatus !== 'granted') permissionDenied = true;
      }
    }

    if (requireLocation) {
      let { status: locationStatus } =
        await Location.getForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        const { status: newLocationStatus } =
          await Location.requestForegroundPermissionsAsync();
        locationStatus = newLocationStatus;
        if (locationStatus !== 'granted') permissionDenied = true;
      }
    }

    if (requireBackgroundLocation) {
      let { status: backgroundStatus } =
        await Location.getBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        const { status: newBackgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
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
    Alert.alert(alertTitle, alertSubtitle, [
      {
        text: 'Go to Settings',
        onPress: () => Linking.openSettings(),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  if (isLoading) {
    return null;
  }

  if (permissionsGranted) {
    return <>{children}</>;
  }

  return (
    <View style={styles.overlay}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{subtitle}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleRequestPermissions}
      >
        <Text style={styles.buttonText}>Grant Permissions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PermissionBlocker;

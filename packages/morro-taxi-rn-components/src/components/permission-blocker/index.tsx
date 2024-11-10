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
import { withTimeout } from '../../utils';

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
    let locationDenied = false;
    let backgroundDenied = false;
    let notificationDenied = false;

    try {
      if (requireLocation) {
        const { status: locationStatus } = await withTimeout(
          Location.getForegroundPermissionsAsync(),
          3000
        );
        if (locationStatus === 'denied') locationDenied = true;
      }
      if (requireBackgroundLocation) {
        const { status: backgroundStatus } = await withTimeout(
          Location.getBackgroundPermissionsAsync(),
          3000
        );
        if (backgroundStatus === 'denied') backgroundDenied = true;
      }
      if (requireNotification) {
        const { status: notificationStatus } = await withTimeout(
          Notifications.getPermissionsAsync(),
          3000
        );
        if (notificationStatus === 'denied') notificationDenied = true;
      }

      const allPermissionsGranted =
        !locationDenied && !backgroundDenied && !notificationDenied;
      setPermissionsGranted(allPermissionsGranted);
    } catch (error) {
      console.error('Error checking permissions or timeout occurred:', error);
      showSettingsAlert();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPermissions = async () => {
    let permissionDenied = false;

    try {
      if (requireLocation) {
        const { status: locationStatus } = await withTimeout(
          Location.getForegroundPermissionsAsync(),
          3000
        );
        if (locationStatus === 'denied') {
          permissionDenied = true;
        } else if (locationStatus !== 'granted') {
          const { status: newLocationStatus } = await withTimeout(
            Location.requestForegroundPermissionsAsync(),
            3000
          );
          if (newLocationStatus !== 'granted') permissionDenied = true;
        }
      }

      if (requireBackgroundLocation) {
        const { status: backgroundStatus } = await withTimeout(
          Location.getBackgroundPermissionsAsync(),
          3000
        );
        if (backgroundStatus === 'denied') {
          permissionDenied = true;
        } else if (backgroundStatus !== 'granted') {
          const { status: newBackgroundStatus } = await withTimeout(
            Location.requestBackgroundPermissionsAsync(),
            3000
          );
          if (newBackgroundStatus !== 'granted') permissionDenied = true;
        }
      }

      if (requireNotification) {
        const { status: notificationStatus } = await withTimeout(
          Notifications.getPermissionsAsync(),
          3000
        );
        if (notificationStatus === 'denied') {
          permissionDenied = true;
        } else if (notificationStatus !== 'granted') {
          const { status: newNotificationStatus } = await withTimeout(
            Notifications.requestPermissionsAsync(),
            3000
          );
          if (newNotificationStatus !== 'granted') permissionDenied = true;
        }
      }

      if (permissionDenied) {
        showSettingsAlert();
      } else {
        setPermissionsGranted(true);
      }
    } catch (error) {
      console.error('Error requesting permissions or timeout occurred:', error);
      Alert.alert(
        'Error',
        'An error occurred while requesting permissions or the request timed out.'
      );
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

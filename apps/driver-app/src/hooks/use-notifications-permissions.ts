import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

const useNotificationPermissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus | null>(null);

  const requestPermissions = async () => {
    // Get the current notification permission status
    const settings = await Notifications.getPermissionsAsync();
    let finalStatus = settings.status;

    // Check if permission was denied in settings
    if (finalStatus === 'denied') {
      Alert.alert(
        'Enable Notifications',
        'To receive notifications, please enable them in Settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }

    // If not granted, request permission
    if (finalStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    setPermissionStatus(finalStatus);

    // Check again if permission is granted after the request
    if (finalStatus !== 'granted') {
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Notifications Permission',
          'Notifications permission is required to receive updates. Please go to Settings and enable notifications for this app.'
        );
      } else {
        alert('Failed to get push token for notifications!');
      }
      return false;
    }

    return true;
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return { permissionStatus, requestPermissions };
};

export default useNotificationPermissions;

import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, AppState, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PermissionBlocker = ({ children }: { children: React.ReactNode }) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    checkPermissions();

    // Add an event listener for app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'active') {
      checkPermissions(); // Re-check permissions when app comes back to the foreground
    }
  };

  const checkPermissions = async () => {
    const { status: locationStatus } = await Location.getForegroundPermissionsAsync();
    const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();
    const { status: notificationStatus } = await Notifications.getPermissionsAsync();

    setPermissionsGranted(
      locationStatus === 'granted' &&
      backgroundStatus === 'granted' &&
      notificationStatus === 'granted'
    );
  };

  const handleRequestPermissions = async () => {
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    const { status: notificationStatus } = await Notifications.requestPermissionsAsync();

    if (
      locationStatus === 'granted' &&
      backgroundStatus === 'granted' &&
      notificationStatus === 'granted'
    ) {
      setPermissionsGranted(true);
    } else {
      Alert.alert(
        'Permissions Required',
        'We need location, background location, and notification permissions to provide ride services.',
        [
          {
            text: 'Go to Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  if (permissionsGranted) {
    return <>{children}</>;
  }

  return (
    <View style={styles.overlay}>
  <Text style={styles.title}>Permissions Required</Text>
  <Text style={styles.message}>
    To receive ride requests and navigate to passengers, we need access to notifications, location, and background location. Please enable these permissions in your settings to start accepting rides.
  </Text>
  <TouchableOpacity style={styles.button} onPress={handleRequestPermissions}>
    <Text style={styles.buttonText}>Grant Permissions</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default PermissionBlocker;

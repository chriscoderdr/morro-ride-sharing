import useNotificationPermissions from '@/src/hooks/use-notifications-permissions';
import { RootState } from '@/src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';


const TokenDisplayScreen: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const { permissionStatus, requestPermissions } = useNotificationPermissions();


  useEffect(() => {
    AsyncStorage.setItem('test', 'testValue')
      .then(() => AsyncStorage.getItem("persist:root"))
      .then((value) => console.log('Persisted state:', value))
      .catch((error) => console.error('AsyncStorage error:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Token Information</Text>
      <Text style={styles.label}>Access Token:</Text>
      <Text style={styles.token}>
        {accessToken || 'No access token available'}
      </Text>
      <Text style={styles.label}>Refresh Token:</Text>
      <Text style={styles.token}>
        {refreshToken || 'No refresh token available'}
      </Text>
      <View>
      <Text>Notification Permission Status: {permissionStatus}</Text>
      <Button
        title="Request Permissions"
        onPress={requestPermissions}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  token: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default TokenDisplayScreen;

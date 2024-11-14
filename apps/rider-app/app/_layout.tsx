import React from 'react';
import { LogBox, View } from 'react-native';
import Setup from '@/src/components/setup';
import config from '@/src/config';
import store, { persistor } from '@/src/store';
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import Mapbox from '@rnmapbox/maps';
import * as Notifications from 'expo-notifications';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootState } from '@/src/store';

const MAPBOX_ACCESS_TOKEN = config.MAPBOX_ACCESS_TOKEN;

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN || '');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthWrapper>
            <Setup />
          </AuthWrapper>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const AuthWrapper = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? (
    <PermissionBlocker
      requireLocation
      requireNotification
      title="Permissions Required"
      subtitle="To help you find and navigate to drivers efficiently, we need access to notifications, location, and background location. Please enable these permissions in your settings to use the full ride services."
      alertTitle="Permissions Required"
      alertSubtitle="To provide the best ride experience, we need access to notifications, location, and background location. Please enable these permissions in your settings to use all features."
    >
      {children}
    </PermissionBlocker>
  ) : (
    <>{children}</>
  );
};

export default App;

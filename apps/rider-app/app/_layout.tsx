import React from 'react';
import { LogBox } from 'react-native';

// Ignore specific warning by message
LogBox.ignoreLogs([
  'Warning: CountryModal: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'
]);

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
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
          <PermissionBlocker
            requireLocation
            requireNotification
            title="Permissions Required"
            subtitle="To help you find and navigate to drivers efficiently, we need access to notifications, location, and background location. Please enable these permissions in your settings to use the full ride services."
            alertTitle="Permissions Required"
            alertSubtitle="To provide the best ride experience, we need access to notifications, location, and background location. Please enable these permissions in your settings to use all features."
          >
            <Setup />
          </PermissionBlocker>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;

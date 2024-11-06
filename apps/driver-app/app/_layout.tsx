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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
          <Setup />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;

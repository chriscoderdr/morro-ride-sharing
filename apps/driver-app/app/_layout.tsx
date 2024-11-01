import useBackgroundLocation from '@/src/hooks/use-background-location';
import useForegroundLocation from '@/src/hooks/use-foreground-location';
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import Mapbox from '@rnmapbox/maps';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

Mapbox.setAccessToken(
  'sk.eyJ1IjoiY2dvbWV6bWVuZGV6IiwiYSI6ImNtMndhbDAwZjAzMXQyanNkMHF2NjR3bmUifQ.f6E28fydW9bkhLBP7L_lCQ'
);

const App = () => {
  useBackgroundLocation();
  useForegroundLocation();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName="signup">
          <Stack.Screen name="signup" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;

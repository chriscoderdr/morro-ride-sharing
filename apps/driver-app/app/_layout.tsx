import React from "react";

import useBackgroundLocation from "@/hooks/use-background-location";
import MapScreen from "@/screens/map-screen";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import Mapbox from "@rnmapbox/maps";
import { QueryClient } from "@tanstack/react-query";
import { LogBox, View } from "react-native";
import useForegroundLocation from "./hooks/use-foreground-location";

LogBox.ignoreLogs([
  "Warning: CountryModal: Support for defaultProps will be removed from function components",
]);

const queryClient = new QueryClient();

Mapbox.setAccessToken(
  "sk.eyJ1IjoiY2dvbWV6bWVuZGV6IiwiYSI6ImNtMndhbDAwZjAzMXQyanNkMHF2NjR3bmUifQ.f6E28fydW9bkhLBP7L_lCQ"
);

export default function HomeLayout() {
  useBackgroundLocation();
  useForegroundLocation();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <>
      <MapScreen />
    </>
  );
}

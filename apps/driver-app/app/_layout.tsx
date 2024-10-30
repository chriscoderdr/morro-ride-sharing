import React from "react";

import KeyboardDismiss from "@/components/keyboard-dismiss";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SignUp from "./signup";

const queryClient = new QueryClient();

export default function HomeLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <GestureHandlerRootView>
      <KeyboardDismiss>
        <QueryClientProvider client={queryClient}>
        <SignUp />
        </QueryClientProvider>
      </KeyboardDismiss>
    </GestureHandlerRootView>
  );
}

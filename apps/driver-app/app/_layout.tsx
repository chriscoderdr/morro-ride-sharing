import React from "react";

import KeyboardDismiss from "@/components/keyboard-dismiss";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  KeyboardAvoidingView,
  LogBox,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import SignUp from "./signup";

LogBox.ignoreLogs([
  "Warning: CountryModal: Support for defaultProps will be removed from function components",
]);

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
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <KeyboardDismiss>
                <SignUp />
              </KeyboardDismiss>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

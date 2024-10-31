import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IRoundedButtonStyles {
  button: ViewStyle;
  text: TextStyle;
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
}

export const styles = StyleSheet.create<IRoundedButtonStyles>({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
});

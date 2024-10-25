import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface ISignUpFormStyles {
  container: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  checkboxContainer: ViewStyle;
  checkboxLabel: TextStyle;
  buttonContainer: ViewStyle;
}

export const styles = StyleSheet.create<ISignUpFormStyles>({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    lineHeight: 30 * 1.3,
    color: "#000000",
    marginBottom: 38,
    textAlign: "center",
  },
  inputContainer: {
    gap: 22,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#000000",
  },
  buttonContainer: {
    marginTop: 40,
  },
});

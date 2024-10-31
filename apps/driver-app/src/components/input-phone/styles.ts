import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IInputPhoneStyles {
  container: ViewStyle;
  phoneContainer: ViewStyle;
  textContainer: ViewStyle;
  countryPickerButton: ViewStyle;
  codeText: TextStyle;
  textInput: TextStyle;
}

export const styles = StyleSheet.create<IInputPhoneStyles>({
  container: {
    flex: 1,
  },
  phoneContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    shadowColor: 'transparent'
  },
  textContainer: {
    paddingTop: 18,
    paddingLeft: 80,
    paddingBottom: 18,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#D8DADC",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  countryPickerButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  codeText: {
    fontSize: 16,
  },
  textInput: {
    fontSize: 16,
  },
});

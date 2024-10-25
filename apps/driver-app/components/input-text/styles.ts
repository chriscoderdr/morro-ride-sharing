import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface IInputTextStyles {
  container: ViewStyle;
  input: TextStyle;
  image: ImageStyle;
  iconContainer: ViewStyle;
}

export const styles = StyleSheet.create<IInputTextStyles>({
  container: {
    paddingTop: 18,
    paddingLeft: 18,
    paddingBottom: 18,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#D8DADC",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    lineHeight: 16 * 1.25,
    color: '#000000',
    flex: 1,
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

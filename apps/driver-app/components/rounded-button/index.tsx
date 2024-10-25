import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

interface IButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  borderRadius?: number;
  type?: "primary" | "secondary";
  testID?: string;
}

const RoundedButton: React.FC<IButtonProps> = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  size = "medium",
  fullWidth = false,
  borderRadius = 10,
  type = "primary",
  testID
}) => {
  const buttonBackgroundColor =
    backgroundColor ?? (type === "primary" ? "#000000" : "#FFFFFF");
  const buttonTextColor =
    textColor ?? (type === "primary" ? "#FFFFFF" : "#000000");
  const borderStyle =
    type === "secondary" ? { borderWidth: 1, borderColor: "#747474" } : {};

  const buttonSizeStyle =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;
  const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: "stretch" } : {};

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonSizeStyle,
        fullWidthStyle,
        borderStyle,
        { backgroundColor: buttonBackgroundColor, borderRadius },
      ]}
      onPress={onPress}
      testID={testID}
    >
      <Text style={[styles.text, { color: buttonTextColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

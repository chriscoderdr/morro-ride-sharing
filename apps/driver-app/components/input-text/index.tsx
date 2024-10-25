import React from "react";
import { View, TextInput, ViewStyle } from "react-native";
import { IInputTextProps } from "./props";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const InputText: React.FC<IInputTextProps> = ({
  IconComponent,
  onIconPress,
  fullWidth = false,
  ...textInputProps
}) => {
  const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: "stretch" } : {};

  return (
    <View style={[styles.container, fullWidthStyle]}>
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        {...textInputProps}
      />
      {IconComponent && (
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          {IconComponent}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;

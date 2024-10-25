import React from "react";
import { Text, View } from "react-native";
import InputText from "../input-text";
import ObscuredInputText from "../obscured-input-text";
import { IInputTextFieldProps } from "./props";
import { styles } from "./styles";

const InputTextField: React.FC<IInputTextFieldProps> = ({
  label,
  IconComponent,
  onIconPress,
  fullWidth = false,
  securedEntry = false,
  errorText,
  errorTestId,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, fullWidth ? { alignSelf: "stretch" } : {}]}>
      <Text style={styles.label}>{label}</Text>
      {securedEntry ? (
        <ObscuredInputText fullWidth={fullWidth} {...inputProps} />
      ) : (
        <InputText
          IconComponent={IconComponent}
          onIconPress={onIconPress}
          fullWidth={fullWidth}
          {...inputProps}
        />
      )}
      {errorText && (
        <Text style={styles.errorText} testID={errorTestId}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default InputTextField;

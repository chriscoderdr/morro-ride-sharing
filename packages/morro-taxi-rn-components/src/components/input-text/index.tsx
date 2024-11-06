import { forwardRef } from 'react';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { IInputTextProps } from './props';
import { styles } from './styles';

const InputText = forwardRef<TextInput, IInputTextProps>(
  (
    { IconComponent, onIconPress, fullWidth = false, ...textInputProps },
    ref
  ) => {
    const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: 'stretch' } : {};

    return (
      <View style={[styles.container, fullWidthStyle]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          ref={ref}
          {...textInputProps}
        />
        {IconComponent && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            {IconComponent}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default InputText;

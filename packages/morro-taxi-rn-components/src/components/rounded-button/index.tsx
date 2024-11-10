import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { IButtonProps } from './props';
import { styles } from './styles';

const RoundedButton: React.FC<IButtonProps> = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  size = 'medium',
  fullWidth = false,
  borderRadius = 10,
  type = 'primary',
  testID,
  disabled = false,
}) => {
  const buttonBackgroundColor =
    backgroundColor ?? (type === 'primary' ? '#000000' : '#FFFFFF');
  const buttonTextColor =
    textColor ?? (type === 'primary' ? '#FFFFFF' : '#000000');
  const borderStyle =
    type === 'secondary' ? { borderWidth: 1, borderColor: '#747474' } : {};

  const buttonSizeStyle =
    size === 'small'
      ? styles.small
      : size === 'large'
        ? styles.large
        : styles.medium;
  const fullWidthStyle: ViewStyle = fullWidth ? { alignSelf: 'stretch' } : {};
  const opacityStyle = disabled ? { opacity: 0.5 } : {};

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonSizeStyle,
        fullWidthStyle,
        borderStyle,
        opacityStyle,
        { backgroundColor: buttonBackgroundColor, borderRadius },
      ]}
      onPress={!disabled ? onPress : undefined}
      testID={testID}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: buttonTextColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;

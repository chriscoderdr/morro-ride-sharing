"use strict";

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const RoundedButton = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  size = 'medium',
  fullWidth = false,
  borderRadius = 10,
  type = 'primary',
  testID,
  disabled = false
}) => {
  const buttonBackgroundColor = backgroundColor ?? (type === 'primary' ? '#000000' : '#FFFFFF');
  const buttonTextColor = textColor ?? (type === 'primary' ? '#FFFFFF' : '#000000');
  const borderStyle = type === 'secondary' ? {
    borderWidth: 1,
    borderColor: '#747474'
  } : {};
  const buttonSizeStyle = size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;
  const fullWidthStyle = fullWidth ? {
    alignSelf: 'stretch'
  } : {};
  const opacityStyle = disabled ? {
    opacity: 0.5
  } : {};
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: [styles.button, buttonSizeStyle, fullWidthStyle, borderStyle, opacityStyle, {
      backgroundColor: buttonBackgroundColor,
      borderRadius
    }],
    onPress: !disabled ? onPress : undefined,
    testID: testID,
    disabled: disabled,
    children: /*#__PURE__*/_jsx(Text, {
      style: [styles.text, {
        color: buttonTextColor
      }],
      children: text
    })
  });
};
export default RoundedButton;
//# sourceMappingURL=index.js.map
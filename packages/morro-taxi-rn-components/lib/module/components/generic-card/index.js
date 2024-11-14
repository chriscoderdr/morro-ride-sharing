"use strict";

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GenericCard = ({
  title,
  subtitle,
  children,
  buttonText,
  onPressButton,
  buttonType = 'primary',
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  secondaryButtonText,
  onPressSecondaryButton,
  secondaryButtonType = 'secondary',
  secondaryButtonStyle,
  secondaryButtonTextStyle
}) => {
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, containerStyle],
    children: [title && /*#__PURE__*/_jsx(Text, {
      style: styles.title,
      children: title
    }), subtitle && /*#__PURE__*/_jsx(Text, {
      style: styles.subtitle,
      children: subtitle
    }), children, buttonText && onPressButton && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.button, buttonType === 'primary' ? styles.primaryButton : styles.secondaryButton, buttonStyle],
      onPress: onPressButton,
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.buttonText, buttonTextStyle],
        children: buttonText
      })
    }), secondaryButtonText && onPressSecondaryButton && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: [styles.button, secondaryButtonType === 'primary' ? styles.primaryButton : styles.secondaryButton, secondaryButtonStyle],
      onPress: onPressSecondaryButton,
      children: /*#__PURE__*/_jsx(Text, {
        style: [styles.buttonText, secondaryButtonTextStyle],
        children: secondaryButtonText
      })
    })]
  });
};
export default GenericCard;
//# sourceMappingURL=index.js.map
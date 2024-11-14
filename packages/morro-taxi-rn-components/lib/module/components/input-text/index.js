"use strict";

import { forwardRef } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const InputText = /*#__PURE__*/forwardRef(({
  IconComponent,
  onIconPress,
  fullWidth = false,
  ...textInputProps
}, ref) => {
  const fullWidthStyle = fullWidth ? {
    alignSelf: 'stretch'
  } : {};
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, fullWidthStyle],
    children: [/*#__PURE__*/_jsx(TextInput, {
      style: styles.input,
      placeholderTextColor: "rgba(0, 0, 0, 0.5)",
      ref: ref,
      ...textInputProps
    }), IconComponent && /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: onIconPress,
      style: styles.iconContainer,
      children: IconComponent
    })]
  });
});
export default InputText;
//# sourceMappingURL=index.js.map
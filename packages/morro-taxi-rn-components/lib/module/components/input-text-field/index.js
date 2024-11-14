"use strict";

import InputPhone from "../input-phone/index.js";
import InputText from "..//input-text/index.js";
import ObscuredInputText from "../obscured-input-text/index.js";
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const InputTextField = /*#__PURE__*/forwardRef(({
  label,
  IconComponent,
  onIconPress,
  fullWidth = false,
  securedEntry = false,
  phoneEntry = false,
  errorText,
  errorTestId,
  ...inputProps
}, ref) => {
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, fullWidth ? {
      alignSelf: 'stretch'
    } : {}],
    children: [/*#__PURE__*/_jsx(Text, {
      style: styles.label,
      children: label
    }), phoneEntry ? /*#__PURE__*/_jsx(InputPhone, {
      ref: ref,
      ...inputProps
    }) : securedEntry ? /*#__PURE__*/_jsx(ObscuredInputText, {
      fullWidth: fullWidth,
      ...inputProps
    }) : /*#__PURE__*/_jsx(InputText, {
      IconComponent: IconComponent,
      onIconPress: onIconPress,
      fullWidth: fullWidth,
      ...inputProps
    }), errorText && /*#__PURE__*/_jsx(Text, {
      style: styles.errorText,
      testID: errorTestId,
      children: errorText
    })]
  });
});
export default InputTextField;
//# sourceMappingURL=index.js.map
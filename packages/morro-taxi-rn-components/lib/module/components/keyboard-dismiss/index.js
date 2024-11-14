"use strict";

import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const KeyboardDismiss = ({
  children
}) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    onPress: dismissKeyboard,
    accessible: false,
    children: /*#__PURE__*/_jsx(View, {
      style: {
        flex: 1
      },
      children: children
    })
  });
};
export default KeyboardDismiss;
//# sourceMappingURL=index.js.map
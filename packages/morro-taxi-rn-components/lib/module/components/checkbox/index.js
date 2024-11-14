"use strict";

import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Checkbox = ({
  checked = false,
  onChange,
  label,
  linkUrl,
  testID
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };
  const handleLabelPress = () => {
    if (linkUrl) {
      Linking.openURL(linkUrl).catch(err => console.error('Failed to open URL:', err));
    }
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: handleCheckboxPress,
      style: styles.checkbox,
      testID: testID,
      children: isChecked && /*#__PURE__*/_jsx(MaterialIcons, {
        name: "check",
        size: 16,
        color: "#FFFFFF"
      })
    }), label && /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: handleLabelPress,
      children: /*#__PURE__*/_jsx(Text, {
        style: styles.label,
        children: label
      })
    })]
  });
};
export default Checkbox;
//# sourceMappingURL=index.js.map
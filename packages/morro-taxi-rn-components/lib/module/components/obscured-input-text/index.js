"use strict";

import InputText from "..//input-text/index.js";
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const ObscuredInputText = ({
  ...inputTextProps
}) => {
  const [isTextHidden, setIsTextHidden] = useState(true);
  const handleIconPress = () => {
    setIsTextHidden(!isTextHidden);
  };
  return /*#__PURE__*/_jsx(InputText, {
    secureTextEntry: isTextHidden,
    textContentType: "oneTimeCode",
    ...inputTextProps,
    IconComponent: isTextHidden ? /*#__PURE__*/_jsx(AntDesign, {
      name: "eye",
      size: 20,
      color: "black"
    }) : /*#__PURE__*/_jsx(AntDesign, {
      name: "eyeo",
      size: 20,
      color: "black"
    }),
    onIconPress: handleIconPress
  });
};
export default ObscuredInputText;
//# sourceMappingURL=index.js.map
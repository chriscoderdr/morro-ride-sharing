"use strict";

import { forwardRef } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from "./styles.js";
import { jsx as _jsx } from "react/jsx-runtime";
const InputPhone = /*#__PURE__*/forwardRef(({
  defaultCode = 'US',
  onChangeText,
  testID,
  defaultValue
}, ref) => {
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: /*#__PURE__*/_jsx(PhoneInput, {
      ref: ref,
      defaultValue: defaultValue,
      defaultCode: defaultCode,
      layout: "first",
      onChangeFormattedText: text => {
        onChangeText && onChangeText(text);
      },
      placeholder: "809-220-1111",
      containerStyle: styles.phoneContainer,
      textContainerStyle: styles.textContainer,
      countryPickerButtonStyle: styles.countryPickerButton,
      codeTextStyle: styles.codeText,
      textInputStyle: styles.textInput,
      textInputProps: {
        placeholderTextColor: 'rgba(0, 0, 0, 0.5)',
        testID: testID
      },
      countryPickerProps: {
        withAlphaFilter: true,
        withCallingCode: true
      }
    })
  });
});
export default InputPhone;
//# sourceMappingURL=index.js.map
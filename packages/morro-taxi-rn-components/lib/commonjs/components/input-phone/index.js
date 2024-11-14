"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativePhoneNumberInput = _interopRequireDefault(require("react-native-phone-number-input"));
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const InputPhone = /*#__PURE__*/(0, _react.forwardRef)(({
  defaultCode = 'US',
  onChangeText,
  testID,
  defaultValue
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: _styles.styles.container,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePhoneNumberInput.default, {
      ref: ref,
      defaultValue: defaultValue,
      defaultCode: defaultCode,
      layout: "first",
      onChangeFormattedText: text => {
        onChangeText && onChangeText(text);
      },
      placeholder: "809-220-1111",
      containerStyle: _styles.styles.phoneContainer,
      textContainerStyle: _styles.styles.textContainer,
      countryPickerButtonStyle: _styles.styles.countryPickerButton,
      codeTextStyle: _styles.styles.codeText,
      textInputStyle: _styles.styles.textInput,
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
var _default = exports.default = InputPhone;
//# sourceMappingURL=index.js.map
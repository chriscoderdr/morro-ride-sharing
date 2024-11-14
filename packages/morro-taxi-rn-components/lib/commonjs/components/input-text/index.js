"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
const InputText = /*#__PURE__*/(0, _react.forwardRef)(({
  IconComponent,
  onIconPress,
  fullWidth = false,
  ...textInputProps
}, ref) => {
  const fullWidthStyle = fullWidth ? {
    alignSelf: 'stretch'
  } : {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [_styles.styles.container, fullWidthStyle],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      style: _styles.styles.input,
      placeholderTextColor: "rgba(0, 0, 0, 0.5)",
      ref: ref,
      ...textInputProps
    }), IconComponent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: onIconPress,
      style: _styles.styles.iconContainer,
      children: IconComponent
    })]
  });
});
var _default = exports.default = InputText;
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../input-phone/index.js"));
var _index2 = _interopRequireDefault(require("..//input-text/index.js"));
var _index3 = _interopRequireDefault(require("../obscured-input-text/index.js"));
var _react = require("react");
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const InputTextField = /*#__PURE__*/(0, _react.forwardRef)(({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [_styles.styles.container, fullWidth ? {
      alignSelf: 'stretch'
    } : {}],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.label,
      children: label
    }), phoneEntry ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
      ref: ref,
      ...inputProps
    }) : securedEntry ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
      fullWidth: fullWidth,
      ...inputProps
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
      IconComponent: IconComponent,
      onIconPress: onIconPress,
      fullWidth: fullWidth,
      ...inputProps
    }), errorText && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.errorText,
      testID: errorTestId,
      children: errorText
    })]
  });
});
var _default = exports.default = InputTextField;
//# sourceMappingURL=index.js.map
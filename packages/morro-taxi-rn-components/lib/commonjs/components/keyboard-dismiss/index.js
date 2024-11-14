"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const KeyboardDismiss = ({
  children
}) => {
  const dismissKeyboard = () => {
    _reactNative.Keyboard.dismiss();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableWithoutFeedback, {
    onPress: dismissKeyboard,
    accessible: false,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        flex: 1
      },
      children: children
    })
  });
};
var _default = exports.default = KeyboardDismiss;
//# sourceMappingURL=index.js.map
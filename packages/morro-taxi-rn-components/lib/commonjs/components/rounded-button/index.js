"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RoundedButton = ({
  text,
  onPress,
  backgroundColor,
  textColor,
  size = 'medium',
  fullWidth = false,
  borderRadius = 10,
  type = 'primary',
  testID,
  disabled = false
}) => {
  const buttonBackgroundColor = backgroundColor ?? (type === 'primary' ? '#000000' : '#FFFFFF');
  const buttonTextColor = textColor ?? (type === 'primary' ? '#FFFFFF' : '#000000');
  const borderStyle = type === 'secondary' ? {
    borderWidth: 1,
    borderColor: '#747474'
  } : {};
  const buttonSizeStyle = size === 'small' ? _styles.styles.small : size === 'large' ? _styles.styles.large : _styles.styles.medium;
  const fullWidthStyle = fullWidth ? {
    alignSelf: 'stretch'
  } : {};
  const opacityStyle = disabled ? {
    opacity: 0.5
  } : {};
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: [_styles.styles.button, buttonSizeStyle, fullWidthStyle, borderStyle, opacityStyle, {
      backgroundColor: buttonBackgroundColor,
      borderRadius
    }],
    onPress: !disabled ? onPress : undefined,
    testID: testID,
    disabled: disabled,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [_styles.styles.text, {
        color: buttonTextColor
      }],
      children: text
    })
  });
};
var _default = exports.default = RoundedButton;
//# sourceMappingURL=index.js.map
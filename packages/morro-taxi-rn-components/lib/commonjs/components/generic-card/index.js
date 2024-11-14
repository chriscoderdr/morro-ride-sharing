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
const GenericCard = ({
  title,
  subtitle,
  children,
  buttonText,
  onPressButton,
  buttonType = 'primary',
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  secondaryButtonText,
  onPressSecondaryButton,
  secondaryButtonType = 'secondary',
  secondaryButtonStyle,
  secondaryButtonTextStyle
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [_styles.styles.container, containerStyle],
    children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.title,
      children: title
    }), subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.subtitle,
      children: subtitle
    }), children, buttonText && onPressButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: [_styles.styles.button, buttonType === 'primary' ? _styles.styles.primaryButton : _styles.styles.secondaryButton, buttonStyle],
      onPress: onPressButton,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [_styles.styles.buttonText, buttonTextStyle],
        children: buttonText
      })
    }), secondaryButtonText && onPressSecondaryButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: [_styles.styles.button, secondaryButtonType === 'primary' ? _styles.styles.primaryButton : _styles.styles.secondaryButton, secondaryButtonStyle],
      onPress: onPressSecondaryButton,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [_styles.styles.buttonText, secondaryButtonTextStyle],
        children: secondaryButtonText
      })
    })]
  });
};
var _default = exports.default = GenericCard;
//# sourceMappingURL=index.js.map
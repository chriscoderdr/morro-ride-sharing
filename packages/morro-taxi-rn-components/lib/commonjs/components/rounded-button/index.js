"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _index = require("../../utils/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  const noop = () => {};
  const debouncedOnPress = (0, _react.useCallback)(onPress ? (0, _index.debounce)(onPress, 500) : noop, [onPress]);
  const handleOnPress = () => {
    if (!disabled) {
      debouncedOnPress();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: [_styles.styles.button, buttonSizeStyle, fullWidthStyle, borderStyle, opacityStyle, {
      backgroundColor: buttonBackgroundColor,
      borderRadius
    }],
    onPress: handleOnPress,
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
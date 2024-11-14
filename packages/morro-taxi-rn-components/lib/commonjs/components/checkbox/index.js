"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vectorIcons = require("@expo/vector-icons");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Checkbox = ({
  checked = false,
  onChange,
  label,
  linkUrl,
  testID
}) => {
  const [isChecked, setIsChecked] = (0, _react.useState)(checked);
  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };
  const handleLabelPress = () => {
    if (linkUrl) {
      _reactNative.Linking.openURL(linkUrl).catch(err => console.error('Failed to open URL:', err));
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _styles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: handleCheckboxPress,
      style: _styles.styles.checkbox,
      testID: testID,
      children: isChecked && /*#__PURE__*/(0, _jsxRuntime.jsx)(_vectorIcons.MaterialIcons, {
        name: "check",
        size: 16,
        color: "#FFFFFF"
      })
    }), label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: handleLabelPress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: _styles.styles.label,
        children: label
      })
    })]
  });
};
var _default = exports.default = Checkbox;
//# sourceMappingURL=index.js.map
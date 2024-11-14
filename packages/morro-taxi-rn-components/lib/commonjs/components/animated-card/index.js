"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const animationTime = 300;
const AnimatedCard = ({
  children,
  isExiting = false,
  onExitComplete,
  style
}) => {
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0.9)).current;
  (0, _react.useEffect)(() => {
    if (isExiting) {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: animationTime,
        useNativeDriver: true
      })]).start(() => {
        if (onExitComplete) onExitComplete();
      });
    } else {
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      })]).start();
    }
  }, [isExiting, fadeAnim, scaleAnim, onExitComplete]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: [{
      opacity: fadeAnim,
      transform: [{
        scale: scaleAnim
      }]
    }, style],
    children: children
  });
};
var _default = exports.default = AnimatedCard;
//# sourceMappingURL=index.js.map
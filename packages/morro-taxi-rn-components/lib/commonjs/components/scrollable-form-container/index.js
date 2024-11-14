"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../keyboard-dismiss/index.js"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ScrollableFormContainer = ({
  children
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.SafeAreaView, {
    style: {
      flex: 1
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
      behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
      style: {
        flex: 1
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        contentContainerStyle: {
          flexGrow: 1
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.container,
            children: children
          })
        })
      })
    })
  });
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
var _default = exports.default = ScrollableFormContainer;
//# sourceMappingURL=index.js.map
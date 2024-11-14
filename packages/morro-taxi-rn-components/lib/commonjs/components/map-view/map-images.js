"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _MaterialIcons = _interopRequireDefault(require("@expo/vector-icons/MaterialIcons"));
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("./styles.js"));
var _Ionicons = _interopRequireDefault(require("@expo/vector-icons/Ionicons"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MapImages = () => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_maps.default.Images, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.Image, {
      name: "me",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.default.iconContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaterialIcons.default, {
          name: "navigation",
          size: 30,
          color: "#00AACC"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.Image, {
      name: "pickupIcon",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.default.iconContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaterialIcons.default, {
          name: "person",
          size: 30,
          color: "#FF5555"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.Image, {
      name: "dropoffIcon",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.default.iconContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MaterialIcons.default, {
          name: "location-pin",
          size: 30,
          color: "#5588FF"
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.Image, {
      name: "carIcon",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.default.iconContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Ionicons.default, {
          name: "car",
          size: 30,
          color: "#5588FF"
        })
      })
    })]
  });
};
var _default = exports.default = MapImages;
//# sourceMappingURL=map-images.js.map
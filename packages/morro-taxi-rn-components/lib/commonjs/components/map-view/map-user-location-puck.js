"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MapUserLocationPuck = () => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.LocationPuck, {
    visible: true,
    topImage: "me",
    puckBearingEnabled: true,
    pulsing: {
      isEnabled: true,
      color: '#CCCCCC',
      radius: 50.0
    }
  });
};
var _default = exports.default = MapUserLocationPuck;
//# sourceMappingURL=map-user-location-puck.js.map
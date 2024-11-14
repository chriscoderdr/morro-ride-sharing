"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapRoute = void 0;
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MapRoute = ({
  route
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.ShapeSource, {
    id: "routeSource",
    shape: route,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.LineLayer, {
      id: "routeLine",
      style: {
        lineWidth: 5,
        lineColor: '#00A8FF'
      }
    })
  });
};
exports.MapRoute = MapRoute;
var _default = exports.default = MapRoute;
//# sourceMappingURL=map-route.js.map
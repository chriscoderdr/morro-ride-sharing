"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _maps = _interopRequireDefault(require("@rnmapbox/maps"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MapPoint = ({
  coordinates,
  iconImage,
  pointId,
  title
}) => {
  const shapeId = `${pointId}Source`;
  const symbolId = `${pointId}Symbol`;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.ShapeSource, {
    id: shapeId,
    shape: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      },
      properties: {
        title: title
      }
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_maps.default.SymbolLayer, {
      id: symbolId,
      style: {
        iconImage: iconImage,
        iconSize: 1
      }
    })
  });
};
var _default = exports.default = MapPoint;
//# sourceMappingURL=map-point.js.map
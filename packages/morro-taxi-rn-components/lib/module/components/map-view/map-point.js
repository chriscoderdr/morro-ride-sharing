"use strict";

import Mapbox from '@rnmapbox/maps';
import { jsx as _jsx } from "react/jsx-runtime";
const MapPoint = ({
  coordinates,
  iconImage,
  pointId,
  title
}) => {
  const shapeId = `${pointId}Source`;
  const symbolId = `${pointId}Symbol`;
  return /*#__PURE__*/_jsx(Mapbox.ShapeSource, {
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
    children: /*#__PURE__*/_jsx(Mapbox.SymbolLayer, {
      id: symbolId,
      style: {
        iconImage: iconImage,
        iconSize: 1
      }
    })
  });
};
export default MapPoint;
//# sourceMappingURL=map-point.js.map
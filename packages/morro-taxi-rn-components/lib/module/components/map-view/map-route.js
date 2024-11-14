"use strict";

import Mapbox from '@rnmapbox/maps';
import { jsx as _jsx } from "react/jsx-runtime";
export const MapRoute = ({
  route
}) => {
  return /*#__PURE__*/_jsx(Mapbox.ShapeSource, {
    id: "routeSource",
    shape: route,
    children: /*#__PURE__*/_jsx(Mapbox.LineLayer, {
      id: "routeLine",
      style: {
        lineWidth: 5,
        lineColor: '#00A8FF'
      }
    })
  });
};
export default MapRoute;
//# sourceMappingURL=map-route.js.map
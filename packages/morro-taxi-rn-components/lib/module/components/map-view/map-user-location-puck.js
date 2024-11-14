"use strict";

import Mapbox from '@rnmapbox/maps';
import { jsx as _jsx } from "react/jsx-runtime";
const MapUserLocationPuck = () => {
  return /*#__PURE__*/_jsx(Mapbox.LocationPuck, {
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
export default MapUserLocationPuck;
//# sourceMappingURL=map-user-location-puck.js.map
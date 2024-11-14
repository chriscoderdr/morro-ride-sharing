"use strict";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Mapbox from '@rnmapbox/maps';
import { View } from 'react-native';
import styles from "./styles.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MapImages = () => {
  return /*#__PURE__*/_jsxs(Mapbox.Images, {
    children: [/*#__PURE__*/_jsx(Mapbox.Image, {
      name: "me",
      children: /*#__PURE__*/_jsx(View, {
        style: styles.iconContainer,
        children: /*#__PURE__*/_jsx(MaterialIcons, {
          name: "navigation",
          size: 30,
          color: "#00AACC"
        })
      })
    }), /*#__PURE__*/_jsx(Mapbox.Image, {
      name: "pickupIcon",
      children: /*#__PURE__*/_jsx(View, {
        style: styles.iconContainer,
        children: /*#__PURE__*/_jsx(MaterialIcons, {
          name: "person",
          size: 30,
          color: "#FF5555"
        })
      })
    }), /*#__PURE__*/_jsx(Mapbox.Image, {
      name: "dropoffIcon",
      children: /*#__PURE__*/_jsx(View, {
        style: styles.iconContainer,
        children: /*#__PURE__*/_jsx(MaterialIcons, {
          name: "location-pin",
          size: 30,
          color: "#5588FF"
        })
      })
    }), /*#__PURE__*/_jsx(Mapbox.Image, {
      name: "carIcon",
      children: /*#__PURE__*/_jsx(View, {
        style: styles.iconContainer,
        children: /*#__PURE__*/_jsx(Ionicons, {
          name: "car",
          size: 30,
          color: "#5588FF"
        })
      })
    })]
  });
};
export default MapImages;
//# sourceMappingURL=map-images.js.map
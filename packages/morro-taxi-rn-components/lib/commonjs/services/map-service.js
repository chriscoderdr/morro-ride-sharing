"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mapboxSdk = _interopRequireDefault(require("@mapbox/mapbox-sdk"));
var _directions = _interopRequireDefault(require("@mapbox/mapbox-sdk/services/directions"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MapService {
  static instance = null;
  constructor(config) {
    this.config = config;
    this.initializeMapService();
  }
  static getInstance(config) {
    if (!MapService.instance) {
      MapService.instance = new MapService(config);
    }
    return MapService.instance;
  }
  initializeMapService() {
    if (!this.config.MAPBOX_ACCESS_TOKEN) {
      throw new Error('Mapbox access token is required');
    }
    this.client = (0, _mapboxSdk.default)({
      accessToken: this.config.MAPBOX_ACCESS_TOKEN
    });
  }
  getRoute = async (userLocation, pickupPoint, dropOffPoint) => {
    try {
      const directionsService = (0, _directions.default)(this.client);
      const response = await directionsService.getDirections({
        profile: 'driving',
        waypoints: [{
          coordinates: [userLocation.longitude, userLocation.latitude]
        }, {
          coordinates: [pickupPoint.longitude, pickupPoint.latitude]
        }, {
          coordinates: [dropOffPoint.longitude, dropOffPoint.latitude]
        }],
        geometries: 'geojson'
      }).send();
      const route = response?.body?.routes?.[0]?.geometry;
      return route;
    } catch (error) {
      console.error('Error fetching directions:', error);
      return undefined;
    }
  };
}
var _default = exports.default = MapService;
//# sourceMappingURL=map-service.js.map
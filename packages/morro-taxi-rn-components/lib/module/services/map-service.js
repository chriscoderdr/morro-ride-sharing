"use strict";

import MapboxClient from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';
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
    this.client = MapboxClient({
      accessToken: this.config.MAPBOX_ACCESS_TOKEN
    });
  }
  getRoute = async (userLocation, pickupPoint, dropOffPoint) => {
    try {
      const directionsService = Directions(this.client);
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
export default MapService;
//# sourceMappingURL=map-service.js.map
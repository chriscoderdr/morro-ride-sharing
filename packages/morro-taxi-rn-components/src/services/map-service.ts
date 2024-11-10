import MapboxClient from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface LineStringGeometry {
  type: 'LineString';
  coordinates: [number, number][];
}

export interface MultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: [number, number][][];
}

export type RouteGeometry = LineStringGeometry | MultiLineStringGeometry;

class MapService {
  private static instance: MapService | null = null;
  private config: { MAPBOX_ACCESS_TOKEN: string };
  private client: any;

  private constructor(config: { MAPBOX_ACCESS_TOKEN: string }) {
    this.config = config;
    this.initializeMapService();
  }

  static getInstance(config: { MAPBOX_ACCESS_TOKEN: string }): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService(config);
    }
    return MapService.instance;
  }

  private initializeMapService() {
    if (!this.config.MAPBOX_ACCESS_TOKEN) {
      throw new Error('Mapbox access token is required');
    }
    this.client = MapboxClient({
      accessToken: this.config.MAPBOX_ACCESS_TOKEN,
    });
  }

  getRoute = async (userLocation: any, pickupPoint: any, dropOffPoint: any) => {
    try {
      const directionsService = Directions(this.client);
      const response = await directionsService
        .getDirections({
          profile: 'driving',
          waypoints: [
            { coordinates: [userLocation.longitude, userLocation.latitude] },
            { coordinates: [pickupPoint.longitude, pickupPoint.latitude] },
            { coordinates: [dropOffPoint.longitude, dropOffPoint.latitude] },
          ],
          geometries: 'geojson',
        })
        .send();

      const route = response?.body?.routes?.[0]?.geometry as
        | RouteGeometry
        | undefined;
      return route;
    } catch (error) {
      console.error('Error fetching directions:', error);
      return undefined;
    }
  };
}

export default MapService;

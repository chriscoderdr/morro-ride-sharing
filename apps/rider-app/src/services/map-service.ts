import MapboxClient from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';
import config from '../config';

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

export interface MapServiceInterface {
  getRoute: (coordinates: Coordinates[]) => Promise<RouteGeometry | undefined>;
}

const client = MapboxClient({ accessToken: config.MAPBOX_SEARCH_ACCESS_TOKEN });
const directionsService = Directions(client);

const getRoute: MapServiceInterface['getRoute'] = async (
  coordinates: Coordinates[]
) => {
  try {
    const response = await directionsService
      .getDirections({
        profile: 'driving',
        waypoints: coordinates.map((coord) => ({
          coordinates: [coord.longitude, coord.latitude]
        })),
        geometries: 'geojson'
      })
      .send();

    const route = response.body.routes[0].geometry as RouteGeometry;
    return route;
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
};

const MapService: MapServiceInterface = { getRoute };

export default MapService;

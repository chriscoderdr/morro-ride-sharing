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
  getRoute: (
    userLocation: Coordinates,
    pickupPoint: Coordinates,
    dropOffPoint: Coordinates
  ) => Promise<RouteGeometry | undefined>;
}

const client = MapboxClient({ accessToken: config.MAPBOX_ACCESS_TOKEN });
const directionsService = Directions(client);

const getRoute: MapServiceInterface['getRoute'] = async (
  userLocation,
  pickupPoint,
  dropOffPoint
) => {
  try {
    console.log(`Fetching route from ${userLocation} to ${pickupPoint} to ${dropOffPoint}`);
    const response = await directionsService
      .getDirections({
        profile: 'driving',
        waypoints: [
          { coordinates: [userLocation.longitude, userLocation.latitude] },
          { coordinates: [pickupPoint.longitude, pickupPoint.latitude] },
          { coordinates: [dropOffPoint.longitude, dropOffPoint.latitude] }
        ],
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

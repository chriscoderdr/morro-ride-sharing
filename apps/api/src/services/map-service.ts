import logger from '@/utils/logger';
import mapbox from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';

const getMapboxClient = () => {
  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (!mapboxAccessToken) {
    throw new Error('Mapbox access token not provided.');
  }

  const client = mapbox({ accessToken: mapboxAccessToken });
  return client;
};

const getDirectionsService = (mapboxClient: any) => {
  if (!mapboxClient) {
    throw new Error('Mapbox client not provided.');
  }
  const service = Directions(mapboxClient);
  return service;
};

const getRoute = async (
  waypoints: [number, number][]
): Promise<{ distance: number; duration: number }> => {
  const mapboxClient = getMapboxClient();
  const directionsService = getDirectionsService(mapboxClient);

  try {
    const response = await directionsService
      .getDirections({
        profile: 'driving',
        waypoints: waypoints.map(([longitude, latitude]) => ({
          coordinates: [longitude, latitude]
        })),
        geometries: 'geojson',
        overview: 'simplified'
      })
      .send();

    const routes = response.body.routes;
    if (routes && routes.length > 0) {
      const route = routes[0];

      return {
        distance: route.distance,
        duration: route.duration
      };
    } else {
      throw new Error('No routes found between the provided locations.');
    }
  } catch (error) {
    logger.error('Failed to calculate route. Error:', JSON.stringify(error));
    throw new Error('Failed to calculate route.');
  }
};

export default { getRoute };

import logger from '@/utils/logger';
import mapbox from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';
import { log } from 'console';

const getMapboxClient = () => {
  const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (!mapboxAccessToken) {
    throw new Error('Mapbox access token not provided.');
  }

  return mapbox({ accessToken: mapboxAccessToken });
};

const getDirectionsService = (mapboxClient: any) => {
  return Directions(mapboxClient);
};

const getRoute = async (waypoints: [number, number][]) => {
  const directionsService = getDirectionsService(getMapboxClient());

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

    logger.info('Got route from Mapbox. 3333: ', response.statusCode);

    // logger.info('Got route from Mapbox. : ' + JSON.stringify(response));

    // if (response.body && response.body.routes?.length > 0) {
    //   logger.info('Got route from Mapbox. : ' + JSON.stringify(response));
    //   const route = response.body.routes[0];

    //   return {
    //     distance: route.distance,
    //     duration: route.duration
    //   };
    // } else {
    //   throw new Error(
    //     'Failed to get route from Mapbox.' + JSON.stringify(response)
    //   );
    // }
    return {
      distance: 100,
      duration: 10
    };
  } catch (error) {
    logger.error(
      'Failed to get route from Mapbox. | error:2222 ' + JSON.stringify(error)
    );
    throw new Error(
      'Failed to get route from Mapbox. | error:2222 ' + JSON.stringify(error)
    );
  }
};

export default { getRoute };

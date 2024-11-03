import mapbox from '@mapbox/mapbox-sdk';
import Directions from '@mapbox/mapbox-sdk/services/directions';
import Driver from '../models/driver';
import RideRequest from '../models/ride-request';
import logger from './logger';

/**
 * Transforms ride request data by calculating distances and estimated times using Mapbox API.
 *
 * @param driver - The driver object with at least the 'id' and 'location' properties.
 * @param rideRequest - The ride request object with necessary properties.
 * @returns An object containing the transformed data.
 */
export async function transformRideData(
  driver: Driver,
  rideRequest: RideRequest
) {
  // Check if necessary data is available
  if (!driver || !driver.location) {
    throw new Error('Driver or driver location not provided.');
  }

  if (
    !rideRequest ||
    !rideRequest.pickupLocation ||
    !rideRequest.dropOffLocation
  ) {
    throw new Error('Ride request or locations not provided.');
  }

  // Extract coordinates
  const driverCoordinates = driver.location.coordinates; // [longitude, latitude]
  const pickupCoordinates = rideRequest.pickupLocation.coordinates; // [longitude, latitude]
  const dropOffCoordinates = rideRequest.dropOffLocation.coordinates; // [longitude, latitude]

  // Initialize Mapbox client
  const mapboxAccessToken =
    process.env.MAPBOX_ACCESS_TOKEN ||
    'sk.eyJ1IjoiY2dvbWV6bWVuZGV6IiwiYSI6ImNtMndhbDAwZjAzMXQyanNkMHF2NjR3bmUifQ.f6E28fydW9bkhLBP7L_lCQ';
  if (!mapboxAccessToken) {
    throw new Error('Mapbox access token not provided.');
  }

  const mapboxClient = mapbox({ accessToken: mapboxAccessToken });
  const directionsService = Directions(mapboxClient);

  // Calculate route from driver to pickup location
  const pickupRoute = await getRoute(
    directionsService,
    driverCoordinates,
    pickupCoordinates
  );

  // Calculate route from pickup to drop-off location
  const tripRoute = await getRoute(
    directionsService,
    pickupCoordinates,
    dropOffCoordinates
  );

  // Prepare display data
  const displayData = {
    rideRequestId: rideRequest.id,
    estimatedPrice: Math.floor(tripRoute.distance / 1000) * 30, // Use rideRequest.estimatedPrice if available
    pickupTimeDistance: {
      distance: formatDistance(pickupRoute.distance),
      time: formatTime(pickupRoute.duration)
    },
    pickupLocation: {
      latitude: pickupCoordinates[1],
      longitude: pickupCoordinates[0],
      address: rideRequest.pickupAddress
    },
    tripTimeDistance: {
      distance: formatDistance(tripRoute.distance),
      time: formatTime(tripRoute.duration)
    },
    tripLocation: {
      latitude: dropOffCoordinates[1],
      longitude: dropOffCoordinates[0],
      address: rideRequest.dropOffAddress
    }
  };

  return displayData;
}

/**
 * Helper function to get route information between two points using Mapbox Directions API.
 *
 * @param directionsService - The Mapbox Directions service instance.
 * @param origin - The origin coordinates [longitude, latitude].
 * @param destination - The destination coordinates [longitude, latitude].
 * @returns An object containing distance (meters) and duration (seconds).
 */
async function getRoute(
  directionsService: ReturnType<typeof Directions>,
  origin: number[],
  destination: number[]
): Promise<{ distance: number; duration: number }> {
  try {
    logger.info(`Fetching route from Mapbox API: ${origin} to ${destination}`);
    const response = await directionsService
      .getDirections({
        profile: 'driving',
        waypoints: [{ coordinates: origin }, { coordinates: destination }],
        geometries: 'geojson',
        overview: 'simplified'
      })
      .send();

    const routes = response.body.routes;
    if (routes && routes.length > 0) {
      const route = routes[0];
      return {
        distance: route.distance, // in meters
        duration: route.duration // in seconds
      };
    } else {
      throw new Error('No routes found between the provided locations.');
    }
  } catch (error) {
    logger.error(`Error fetching route from Mapbox API: ${error.message}`);
    throw new Error('Failed to calculate route.');
  }
}

/**
 * Formats distance from meters to a readable string.
 *
 * @param meters - The distance in meters.
 * @returns A formatted distance string.
 */
function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return (meters / 1000).toFixed(1) + ' km';
  } else {
    return Math.round(meters) + ' m';
  }
}

/**
 * Formats time from seconds to a readable string.
 *
 * @param seconds - The time in seconds.
 * @returns A formatted time string.
 */
function formatTime(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    return `${hours} hr ${minutes} min`;
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return minutes + ' min';
  } else {
    return Math.round(seconds) + ' sec';
  }
}

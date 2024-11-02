import sequelize from '../config/database';
import Driver from '../models/driver';
import RideRequest from '../models/ride-request';

/**
 * Transforms ride request data by calculating distances and estimated times.
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

  if (!rideRequest || !rideRequest.pickupLocation || !rideRequest.dropOffLocation) {
    throw new Error('Ride request or locations not provided.');
  }

  // Extract coordinates
  const driverCoordinates = driver.location.coordinates;
  const driverLongitude = driverCoordinates[0];
  const driverLatitude = driverCoordinates[1];

  const pickupCoordinates = rideRequest.pickupLocation.coordinates;
  const pickupLongitude = pickupCoordinates[0];
  const pickupLatitude = pickupCoordinates[1];

  const dropOffCoordinates = rideRequest.dropOffLocation.coordinates;
  const dropOffLongitude = dropOffCoordinates[0];
  const dropOffLatitude = dropOffCoordinates[1];

  // Calculate distances using PostGIS functions
  const distanceResults = await sequelize.query(
    `
    SELECT
      ST_Distance(
        ST_SetSRID(ST_MakePoint(:driverLongitude, :driverLatitude), 4326)::geography,
        ST_SetSRID(ST_MakePoint(:pickupLongitude, :pickupLatitude), 4326)::geography
      ) AS "pickupDistance",
      ST_Distance(
        ST_SetSRID(ST_MakePoint(:pickupLongitude, :pickupLatitude), 4326)::geography,
        ST_SetSRID(ST_MakePoint(:dropOffLongitude, :dropOffLatitude), 4326)::geography
      ) AS "tripDistance"
    `,
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        driverLongitude,
        driverLatitude,
        pickupLongitude,
        pickupLatitude,
        dropOffLongitude,
        dropOffLatitude,
      },
    }
  );

  const pickupDistance = distanceResults[0].pickupDistance; // in meters
  const tripDistance = distanceResults[0].tripDistance;     // in meters

  // Estimate travel times
  const averageSpeed = 11.11; // meters per second (approximately 40 km/h)

  const pickupTimeInSeconds = pickupDistance / averageSpeed;
  const tripTimeInSeconds = tripDistance / averageSpeed;

  // Prepare display data
  const displayData = {
    rideRequestId: rideRequest.id,
    estimatedPrice: 90, // or rideRequest.estimatedPrice if available
    pickupTimeDistance: {
      distance: formatDistance(pickupDistance),
      time: formatTime(pickupTimeInSeconds),
    },
    pickupLocation: {
      latitude: pickupLatitude,
      longitude: pickupLongitude,
      address: rideRequest.pickupAddress,
    },
    tripTimeDistance: {
      distance: formatDistance(tripDistance),
      time: formatTime(tripTimeInSeconds),
    },
    tripLocation: {
      latitude: dropOffLatitude,
      longitude: dropOffLongitude,
      address: rideRequest.dropOffAddress,
    },
  };

  return displayData;
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
    return hours + ' hour(s)';
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return minutes + ' minute(s)';
  } else {
    return Math.round(seconds) + ' seconds';
  }
}

import { Op, Sequelize } from 'sequelize';
import { Driver } from '../models';
import logger from './logger';

export const findNearbyDrivers = async (
  longitude: number,
  latitude: number,
  radiusInMeters: number
) => {
  logger.info(`Finding drivers near location: ${longitude}, ${latitude}`);

  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000); // Only consider drivers updated within the last 2 minutes

  try {
    const drivers = await Driver.findAll({
      where: {
        lastLocationUpdatedAt: { [Op.gte]: twoMinutesAgo },
        isAvailable: true,
        [Op.and]: [
          Sequelize.where(
            Sequelize.literal(`
              ST_DWithin(
                location,
                ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
                :radiusInMeters
              )
            `),
            true
          ),
          Sequelize.literal(`
            NOT EXISTS (
              SELECT 1
              FROM "ride_requests" AS "RideRequest"
              WHERE "RideRequest"."driverId" = "Driver"."id"
                AND "RideRequest"."status" != 'dropped-off'
            )
          `)
        ]
      },
      order: [
        [
          Sequelize.literal(`
            ST_Distance(
              location,
              ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
            )
          `),
          'ASC'
        ]
      ],
      limit: 100,
      replacements: { longitude, latitude, radiusInMeters }
    });

    logger.info(`Total drivers found: ${drivers.length}`);
    drivers.forEach((driver) => {
      logger.info(`Driver ID: ${driver.id}, Location: ${driver.location}`);
    });

    return drivers;
  } catch (error) {
    logger.error('Error finding nearby drivers:', error);
    throw error;
  }
};

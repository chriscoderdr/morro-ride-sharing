import { Op } from 'sequelize';
import sequelize from '../config/database';
import Driver from '../models/driver';
import logger from './logger';

export const findNearbyDrivers = async (
  longitude: number,
  latitude: number,
  radiusInMeters: number
) => {
  logger.info(`Finding drivers near location: ${longitude}, ${latitude}`);
  
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000); // 2 minutes ago
  
  const drivers = await Driver.findAll({
    where: {
      // Uncomment this line if you want to filter by recent updates:
      lastLocationUpdatedAt: { [Op.gte]: twoMinutesAgo },
      [Op.and]: sequelize.where(
        sequelize.literal(
          `ST_DWithin(
            location,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
            :radiusInMeters
          )`
        ),
        true
      ),
    },
    order: [
      [
        sequelize.literal(
          `ST_Distance(
            location,
            ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography
          )`
        ),
        'ASC',
      ],
    ],
    limit: 100, // Ensure this is enough to include all nearby drivers
    replacements: {
      longitude,
      latitude,
      radiusInMeters,
    },
  });

  logger.info(`Total drivers found: ${drivers.length}`);
  drivers.forEach((driver) => {
    logger.info(`Driver ID: ${driver.id}, Location: ${driver.location}`);
  });

  return drivers;
};
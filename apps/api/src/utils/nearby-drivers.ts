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
  const drivers = await Driver.findAll({
    where: {
      location: {
        [Op.ne]: null,
      },
      // isAvailable: true,
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
    limit: 10,
    // Use 'replacements' or 'bind' for parameter binding
    replacements: {
      longitude,
      latitude,
      radiusInMeters,
    },
  });

  return drivers;
};

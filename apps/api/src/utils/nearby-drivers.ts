import { Op } from 'sequelize';
import Driver from '../models/driver';

async function findNearbyAvailableDrivers(
  lat: number,
  lon: number,
  maxDistance: number
) {
  const nearbyDrivers = await Driver.findAll({
    where: {
      isAvailable: true,
      lastLocationUpdatedAt: {
        [Op.gte]: new Date(Date.now() - 5 * 60 * 1000)
      },
      lastLocationLatitude: {
        [Op.between]: [lat - maxDistance, lat + maxDistance]
      },
      lastLocationLongitude: {
        [Op.between]: [lon - maxDistance, lon + maxDistance]
      }
    }
  });

  return nearbyDrivers;
}

import sequelize from '@/config/database';
import Driver from './driver';
import RideRequest from './ride-request';
import Rider from './rider';

Driver.hasOne(RideRequest, {
  foreignKey: 'driverId',
  as: 'currentRideRequest'
});
RideRequest.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });

Rider.hasMany(RideRequest, { foreignKey: 'riderId', as: 'rideRequests' });
RideRequest.belongsTo(Rider, { foreignKey: 'riderId', as: 'rider' });

export { Driver, Rider, RideRequest, sequelize };

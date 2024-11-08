import { Driver, RideRequest } from '../models';
import mapService from '@/services/map-service';
import priceCalculator from './price-calculator';
import formatter from './formatter';

export async function transformRideData(
  driver: Driver,
  rideRequest: RideRequest
) {
  if (driver == null || driver.location == null || rideRequest == null) {
    throw new Error('Invalid driver or ride request data.');
  }
  const driverToPickupRoute = await mapService.getRoute([
    driver.location.coordinates,
    rideRequest.pickupLocation.coordinates
  ]);

  const pickupToDropOffRoute = await mapService.getRoute([
    rideRequest.pickupLocation.coordinates,
    rideRequest.dropOffLocation.coordinates
  ]);

  const price = priceCalculator.calculateRidePrice(
    pickupToDropOffRoute.distance
  );

  const displayData = {
    rideRequestId: rideRequest.id,
    estimatedPrice: price,
    pickupTimeDistance: {
      distance: formatter.formatDistance(driverToPickupRoute.distance),
      time: formatter.formatTime(driverToPickupRoute.duration)
    },
    pickupLocation: {
      latitude: rideRequest.pickupLocation.coordinates[1],
      longitude: rideRequest.pickupLocation.coordinates[0],
      address: rideRequest.pickupAddress
    },
    tripTimeDistance: {
      distance: formatter.formatDistance(pickupToDropOffRoute.distance),
      time: formatter.formatTime(pickupToDropOffRoute.duration)
    },
    tripLocation: {
      latitude: rideRequest.dropOffLocation.coordinates[1],
      longitude: rideRequest.dropOffLocation.coordinates[0],
      address: rideRequest.dropOffAddress
    },
    status: rideRequest.status
  };

  return displayData;
}

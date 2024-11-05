import { Queue } from 'bullmq';
import { RideRequest } from '../models';

class QueueService {
  private rideRequestQueue: Queue;

  constructor() {
    this.rideRequestQueue = new Queue('ride_requests', {
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
      }
    });
  }

  async addRideRequestToQueue(rideRequest: RideRequest) {
    try {
      await this.rideRequestQueue.add('newRideRequest', {
        id: rideRequest.id,
        riderId: rideRequest.riderId,
        pickupLocation: rideRequest.pickupLocation,
        dropOffLocation: rideRequest.dropOffLocation,
        pickupAddress: rideRequest.pickupAddress,
        dropOffAddress: rideRequest.dropOffAddress
      });
    } catch (error) {
      throw new Error('Failed to add ride request to the queue');
    }
  }
}

export default QueueService;

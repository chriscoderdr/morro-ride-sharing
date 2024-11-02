import { Queue } from 'bullmq';
import RideRequest from '../models/ride-request';

class QueueService {
  private rideRequestQueue: Queue;

  constructor() {
    this.rideRequestQueue = new Queue('ride_requests', {
      connection: {
        host: 'localhost',
        port: 6379
      }
    });
  }

  async addRideRequestToQueue(rideRequest: RideRequest) {
    try {
      await this.rideRequestQueue.add('newRideRequest', {
        id: rideRequest.id,
        riderId: rideRequest.riderId,
        pickupLocation: rideRequest.pickupLocation,
        dropOffLocation: rideRequest.dropOffLocation
      });
    } catch (error) {
      throw new Error('Failed to add ride request to the queue');
    }
  }
}

export default QueueService;

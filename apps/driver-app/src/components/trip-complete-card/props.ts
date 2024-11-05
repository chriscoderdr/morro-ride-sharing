import { RideRequest } from '@/src/api/models';

export interface ITripCompleteCardProps {
  rideRequest: RideRequest;
  onCompleteTrip: () => void;
}

import { RideRequest } from '@/src/store/slices/ride-request-slice';

export interface IRideRequestCardProps {
  rideRequest: RideRequest;
  onAccept: () => void;
}

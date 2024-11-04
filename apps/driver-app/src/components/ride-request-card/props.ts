import { RideRequest } from '@/src/store/slices/ride-request-slice';

export interface RideRequestCardProps {
  rideRequest: RideRequest;
  onAccept: () => void;
}

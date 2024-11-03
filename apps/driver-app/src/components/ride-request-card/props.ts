import { RideRequestState } from '@/src/store/slices/ride-request-slice';

export interface RideRequestCardProps {
  rideRequest: RideRequestState;
  onAccept: () => void;
}

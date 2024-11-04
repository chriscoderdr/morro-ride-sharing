import { RideRequest } from '@/src/store/slices/ride-request-slice';

export interface ITripInProgressCardProps {
  rideRequest: RideRequest;
  onPickUpRider: () => void;
  onCallRider: () => void;
}

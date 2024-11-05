import { RideRequest } from '@/src/api/models';

export interface RideCardProps {
  rideRequest: RideRequest;
  type: 'start' | 'inProgress' | 'request';
  onAccept?: () => void;
  onStartTrip?: () => void;
  onPickUpRider?: () => void;
  onCallRider?: () => void;
}

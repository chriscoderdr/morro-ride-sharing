import { RideState } from '@/src/store/slices/ride-slice';

export interface RideCardProps {
  ride: RideState;
  type:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  onCompleteTrip?: () => void;
  onCallDriver?: (driverPhone: string) => void;
  onCancelRide?: () => void;
}

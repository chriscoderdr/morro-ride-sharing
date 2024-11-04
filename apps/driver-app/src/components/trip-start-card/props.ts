import { RideRequest } from "@/src/store/slices/ride-request-slice";

export interface ITripStartCardProps {
    rideRequest: RideRequest;
    onStartTrip: () => void;
    onCallRider: () => void;
  }
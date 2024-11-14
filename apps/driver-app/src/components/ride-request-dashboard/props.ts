import { RideRequest } from "@/src/api/models";


export interface IRideRequestManagerProps {
  rideRequests: RideRequest[];
  handleAcceptRide: (rideRequestId: string) => void;
  handleCallRider: (riderPhone: string) => void;
  handleStartTrip: (rideRequestId: string) => void;
  handleConfirmPickup: (rideRequestId: string) => void;
  handleCompleteTrip: (rideRequestId: string) => void;
}

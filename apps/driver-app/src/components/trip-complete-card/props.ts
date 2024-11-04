interface ITripCompleteCardProps {
  rideRequest: {
    tripTimeDistance: { time: string };
    riderName: string;
    tripLocation?: { address: string };
  };
  onCompleteTrip: () => void;
}

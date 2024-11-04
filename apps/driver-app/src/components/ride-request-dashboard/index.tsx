import { RideRequest } from '@/src/api/models';
import RideRequestCard from '@/src/components/ride-request-card';
import TripCompleteCard from '@/src/components/trip-complete-card';
import TripInProgressCard from '@/src/components/trip-in-progress-card';
import TripStartCard from '@/src/components/trip-start-card';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import {
  acceptRideRequest,
  completeRideRequest,
  pickUpRideRequest,
  selectCurrentRideRequest,
  startRideRequest
} from '@/src/store/slices/ride-request-slice';
import { Alert, Linking, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import AnimatedRideRequestCard from '../animated-ride-request-card';

const RideRequestDashboard = () => {
  const rideRequests = useSelector(
    (state: any) => state.rideRequest.requests
  ) as RideRequest[];
  const currentRide = useSelector(selectCurrentRideRequest);
  const dispatch = useAppDispatch();

  const handleConfirmPickup = (rideRequestId: string) => {
    dispatch(pickUpRideRequest({ rideRequestId }));
  };

  const handleAcceptRide = (rideRequestId: string) => {
    dispatch(acceptRideRequest({ rideRequestId }));
  };

  const handleStartTrip = (rideRequestId: string) => {
    dispatch(startRideRequest({ rideRequestId }));
  };

  const handleCompleteTrip = (rideRequestId: string) => {
    dispatch(completeRideRequest({ rideRequestId }));
  };

  const handleCallRider = (riderPhone: string) => {
    const phoneNumber = `tel:${riderPhone}`;
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      Linking.canOpenURL(phoneNumber)
        .then((supported) => {
          if (!supported) {
            Alert.alert(
              'Error',
              'Unable to make the call. This feature works only on a real device.'
            );
          } else {
            Linking.openURL(phoneNumber);
          }
        })
        .catch((err) => console.error('Error checking phone URL:', err));
    } else {
      Alert.alert(
        'Error',
        'Unable to make the call. This feature works only on a real device.'
      );
    }
  };

  return (
    <View>
      {!currentRide &&
        rideRequests
          .filter((request) => request.status === 'pending')
          .map((request) => (
            <AnimatedRideRequestCard key={request.rideRequestId}>
              <RideRequestCard
                rideRequest={request}
                onAccept={() => handleAcceptRide(request.rideRequestId)}
              />
            </AnimatedRideRequestCard>
          ))}

      {/* Show the active ride based on its status */}
      {currentRide?.status === 'accepted' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <TripStartCard
            rideRequest={currentRide}
            onCallRider={() => handleCallRider(currentRide.riderPhone || '')}
            onStartTrip={() => handleStartTrip(currentRide.rideRequestId)}
          />
        </AnimatedRideRequestCard>
      )}

      {currentRide?.status === 'started' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <TripInProgressCard
            rideRequest={currentRide}
            onCallRider={() => handleCallRider(currentRide.riderPhone || '')}
            onPickUpRider={() => handleConfirmPickup(currentRide.rideRequestId)}
          />
        </AnimatedRideRequestCard>
      )}

      {currentRide?.status === 'picked-up' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <TripCompleteCard
            rideRequest={currentRide}
            onCompleteTrip={() => handleCompleteTrip(currentRide.rideRequestId)}
          />
        </AnimatedRideRequestCard>
      )}
    </View>
  );
};

export default RideRequestDashboard;

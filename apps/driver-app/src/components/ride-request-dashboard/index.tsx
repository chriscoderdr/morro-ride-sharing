import { RideRequest } from '@/src/api/models';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import {
  acceptRideRequest,
  completeRideRequest,
  pickUpRideRequest,
  selectCurrentRideRequest,
  startRideRequest
} from '@/src/store/slices/ride-request-slice';
import { Alert, FlatList, Linking, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import AnimatedRideRequestCard from '../animated-ride-request-card';
import RideCard from '../ride-card';

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

  const handleStartRide = (rideRequestId: string) => {
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
      <FlatList
        data={rideRequests.filter((request) => request.status === 'pending')}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => {
          return (
            <AnimatedRideRequestCard key={item.rideRequestId}>
              <RideCard
                rideRequest={item}
                type="pending"
                onCallRider={handleCallRider}
                onCompleteTrip={handleCompleteTrip}
                onAccept={handleAcceptRide}
                onPickUpRider={handleConfirmPickup}
                onStartRide={handleStartRide}
              />
            </AnimatedRideRequestCard>
          );
        }}
      />
      {/* Show the active ride based on its status */}
      {currentRide?.status === 'accepted' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            rideRequest={currentRide}
            type="accepted"
            onCallRider={handleCallRider}
            onCompleteTrip={handleCompleteTrip}
            onAccept={handleAcceptRide}
            onPickUpRider={handleConfirmPickup}
            onStartRide={handleStartRide}
          />
        </AnimatedRideRequestCard>
      )}

      {currentRide?.status === 'started' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            rideRequest={currentRide}
            type="started"
            onCallRider={handleCallRider}
            onCompleteTrip={handleCompleteTrip}
            onAccept={handleAcceptRide}
            onPickUpRider={handleConfirmPickup}
            onStartRide={handleStartRide}
          />
        </AnimatedRideRequestCard>
      )}

      {currentRide?.status === 'picked-up' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            rideRequest={currentRide}
            type="picked-up"
            onCallRider={handleCallRider}
            onCompleteTrip={handleCompleteTrip}
            onAccept={handleAcceptRide}
            onPickUpRider={handleConfirmPickup}
            onStartRide={handleStartRide}
          />
        </AnimatedRideRequestCard>
      )}
    </View>
  );
};

export default RideRequestDashboard;

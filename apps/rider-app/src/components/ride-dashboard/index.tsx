import { RideRequest } from '@/src/api/models';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';

import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import AnimatedRideRequestCard from '../animated-ride-request-card';
import RideCard from '../ride-card';
import { RootState } from '@/src/store';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import { clearRide } from '@/src/store/slices/ride-slice';
import { useRouter } from 'expo-router';

const RideRequestDashboard = () => {
  const currentRide = useSelector((state: RootState) => state.ride);
  const screenWidth = Dimensions.get('window').width;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleConfirmPickup = (rideRequestId: string) => {
    // dispatch(pickUpRideRequest({ rideRequestId }));
  };

  const handleAcceptRide = (rideRequestId: string) => {
    // dispatch(acceptRideRequest({ rideRequestId }));
  };

  const handleStartRide = (rideRequestId: string) => {
    // dispatch(startRideRequest({ rideRequestId }));
  };

  const handleCompleteTrip = (rideRequestId: string) => {
    // dispatch(completeRideRequest({ rideRequestId }));
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

  const onCancelRide = () => {
    dispatch(clearRide());
    router.navigate('/main');
  };

  return (
    <View>
      {currentRide?.status === 'pending' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            ride={currentRide}
            type="pending"
            onCallRider={handleCallRider}
            onCompleteTrip={handleCompleteTrip}
            onAccept={handleAcceptRide}
            onPickUpRider={handleConfirmPickup}
            onStartRide={handleStartRide}
          />
        </AnimatedRideRequestCard>
      )}
      {currentRide?.status === 'accepted' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            ride={currentRide}
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
            ride={currentRide}
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
            ride={currentRide}
            type="picked-up"
            onCallRider={handleCallRider}
            onCompleteTrip={handleCompleteTrip}
            onAccept={handleAcceptRide}
            onPickUpRider={handleConfirmPickup}
            onStartRide={handleStartRide}
          />
        </AnimatedRideRequestCard>
      )}
      {currentRide?.status === 'dropped-off' && (
        <AnimatedRideRequestCard key={currentRide.rideRequestId}>
          <RideCard
            ride={currentRide}
            type="dropped-off"
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

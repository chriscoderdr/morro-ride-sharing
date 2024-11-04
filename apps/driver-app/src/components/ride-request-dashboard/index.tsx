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
  startRideRequest
} from '@/src/store/slices/ride-request-slice';
import { Alert, Linking, Platform } from 'react-native';
import { useSelector } from 'react-redux';

const RideRequestDashboard = () => {
  const rideRequests = useSelector(
    (state: any) => state.rideRequest.requests
  ) as RideRequest[];
  const dispatch = useAppDispatch();

  const handleConfirmPickup = (rideRequestId: string) => {
    const data = async () => {
      try {
        await dispatch(pickUpRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to confirm rider pickup.');
      }
    };
    data().catch(() => console.error('Error confirming pickup'));
  };

  const handleAcceptRide = (rideRequestId: string) => {
    const data = async () => {
      console.log(`Accepting ride request: ${rideRequestId}`);
      try {
        await dispatch(acceptRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to accept the ride request.');
      }
    };
    data().catch(() => {
      console.error('Error accepting ride request');
    });
  };

  const handleStartTrip = (rideRequestId: string) => {
    const data = async () => {
      console.log(`Starting trip for request: ${rideRequestId}`);
      try {
        await dispatch(startRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to start the trip.');
      }
    };
    data().catch(() => {
      console.error('Error starting trip');
    });
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

  const handleCompleteTrip = (rideRequestId: string) => {
    const data = async () => {
      try {
        await dispatch(completeRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to complete the trip.');
      }
    };
    data().catch(() => console.error('Error completing trip'));
  };

  return (
    <>
      {rideRequests
        .filter((request) => request.status === 'pending')
        .map((request) => (
          <RideRequestCard
            key={request.rideRequestId}
            rideRequest={request}
            onAccept={() => handleAcceptRide(request.rideRequestId)}
          />
        ))}

      {rideRequests
        .filter((request) => request.status === 'accepted')
        .map((request) => (
          <TripStartCard
            key={request.rideRequestId}
            rideRequest={request}
            onCallRider={() => handleCallRider(request.riderPhone || '')}
            onStartTrip={() => handleStartTrip(request.rideRequestId)}
          />
        ))}

      {rideRequests
        .filter((request) => request.status === 'started')
        .map((request) => (
          <TripInProgressCard
            key={request.rideRequestId}
            rideRequest={request}
            onCallRider={() => handleCallRider(request.riderPhone || '')}
            onPickUpRider={() => handleConfirmPickup(request.rideRequestId)}
          />
        ))}

      {rideRequests
        .filter((request) => request.status === 'picked-up')
        .map((request) => (
          <TripCompleteCard
            key={request.rideRequestId}
            rideRequest={request}
            onCompleteTrip={() => handleCompleteTrip(request.rideRequestId)}
          />
        ))}
    </>
  );
};

export default RideRequestDashboard;

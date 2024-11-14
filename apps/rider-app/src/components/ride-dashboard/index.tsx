import { useAppDispatch } from '@/src/hooks/use-app-dispatch';

import { Alert, Linking, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';

import RideCard from '../ride-card';
import { RootState } from '@/src/store';
import { AnimatedCard, GenericCard } from 'react-native-morro-taxi-rn-components';
import { clearRide, completeRide } from '@/src/store/slices/ride-slice';
import { clearAllErrors } from '@/src/store/slices/error-slice';
import { styles } from './styles';

const RideRequestDashboard = () => {
  const currentRide = useSelector((state: RootState) => state.ride);
  const errors = useSelector((state: RootState) => state.error);
  const dispatch = useAppDispatch();

  const handleCompleteTrip = () => {
    dispatch(completeRide());
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
  };

  return (
    <View>
      {errors?.errors && errors.errors.length > 0 && (
        <View style={styles.errorsContainer}>
          <GenericCard
            title={'Error'}
            subtitle={errors.errors[0]}
            buttonType="secondary"
            buttonText="Dismiss"
            onPressButton={() => {
              dispatch(clearAllErrors());
            }}
          />
        </View>
      )}

      {!errors.errors ||
        (errors.errors.length == 0 && currentRide?.status === 'pending' && (
          <AnimatedCard key={currentRide.rideRequestId}>
            <RideCard
              ride={currentRide}
              type="pending"
              onCallDriver={handleCallRider}
              onCompleteTrip={handleCompleteTrip}
              onCancelRide={onCancelRide}
            />
          </AnimatedCard>
        ))}
      {!errors.errors ||
        (errors.errors.length == 0 && currentRide?.status === 'accepted' && (
          <AnimatedCard key={currentRide.rideRequestId}>
            <RideCard
              ride={currentRide}
              type="accepted"
              onCallDriver={handleCallRider}
              onCompleteTrip={handleCompleteTrip}
              onCancelRide={onCancelRide}
            />
          </AnimatedCard>
        ))}
      {!errors.errors ||
        (errors.errors.length == 0 && currentRide?.status === 'started' && (
          <AnimatedCard key={currentRide.rideRequestId}>
            <RideCard
              ride={currentRide}
              type="started"
              onCallDriver={handleCallRider}
              onCompleteTrip={handleCompleteTrip}
              onCancelRide={onCancelRide}
            />
          </AnimatedCard>
        ))}
      {!errors.errors ||
        errors.errors.length == 0 &&
        currentRide?.status === 'picked-up' && (
          <AnimatedCard key={currentRide.rideRequestId}>
            <RideCard
              ride={currentRide}
              type="picked-up"
              onCallDriver={handleCallRider}
              onCompleteTrip={handleCompleteTrip}
              onCancelRide={onCancelRide}
            />
          </AnimatedCard>
        )}
      {!errors?.errors ||
        (errors.errors.length == 0 && currentRide?.status === 'dropped-off' && (
          <AnimatedCard key={currentRide.rideRequestId}>
            <RideCard
              ride={currentRide}
              type="dropped-off"
              onCallDriver={handleCallRider}
              onCompleteTrip={handleCompleteTrip}
              onCancelRide={onCancelRide}
            />
          </AnimatedCard>
        ))}
    </View>
  );
};

export default RideRequestDashboard;

import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';

import useRoute from '@/src/hooks/use-route';
import { useEstimateRideMutation } from '@/src/store/slices/api-slice';
import {
  createRideRequest,
  selectCurrentDropOff,
  selectCurrentPickup
} from '@/src/store/slices/ride-slice';
import { AnimatedCard, GenericCard, MapView } from 'react-native-morro-taxi-rn-components';


import RideConfirmationCard from '../ride-selection';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { styles } from './styles';

const ConfirmRideLocation = () => {
  const router = useRouter();
  const { route, fetchRoute } = useRoute();
  const currentPickup = useSelector(selectCurrentPickup);
  const currentDropoff = useSelector(selectCurrentDropOff);
  const dispatch = useAppDispatch();
  const riderequest = useSelector((state: RootState) => state.ride);

  const [
    estimateRide,
    { data: estimateData, error: estimateError, isLoading: isLoadingEstimate }
  ] = useEstimateRideMutation();

  useEffect(() => {
    if (currentPickup && currentDropoff) {
      const coordinates = [
        {
          latitude: currentPickup.coordinates[1],
          longitude: currentPickup.coordinates[0]
        },
        {
          latitude: currentDropoff.coordinates[1],
          longitude: currentDropoff.coordinates[0]
        }
      ];
      fetchRoute(coordinates);
      loadRideEstimate();
    }
  }, [currentPickup, currentDropoff]);

  useEffect(() => {
    if (riderequest?.rideRequestId && riderequest?.status != 'completed') {
      router.replace('/ride-process');
    }
  }, [riderequest]);

  const loadRideEstimate = () => {
    const fetchEstimate = async () => {
      try {
        const response = await estimateRide({
          pickupLocation: {
            address: currentPickup.address,
            latitude: currentPickup.coordinates[1],
            longitude: currentPickup.coordinates[0]
          },
          dropOffLocation: {
            address: currentDropoff.address,
            latitude: currentDropoff.coordinates[1],
            longitude: currentDropoff.coordinates[0]
          },
          estimatePrice: ''
        });
      } catch (error) {}
    };

    fetchEstimate();
  };

  const onConfirmLocation = async () => {
    if (
      !estimateData ||
      (estimateData.nearbyDrivers && estimateData.nearbyDrivers.length === 0)
    ) {
      await loadRideEstimate();
      return;
    }
    try {
      dispatch(
        createRideRequest({
          pickupLocation: {
            address: currentPickup.address,
            latitude: currentPickup.coordinates[1],
            longitude: currentPickup.coordinates[0]
          },
          dropOffLocation: {
            address: currentDropoff.address,
            latitude: currentDropoff.coordinates[1],
            longitude: currentDropoff.coordinates[0]
          },
          estimatePrice: estimateData.estimatePrice
        })
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onCancel = () => {
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      {currentPickup &&
        currentDropoff &&
        currentPickup.coordinates &&
        currentDropoff.coordinates && (
          <MapView
            pickup={[
              currentPickup?.coordinates[0],
              currentPickup?.coordinates[1]
            ]}
            dropoff={[
              currentDropoff?.coordinates[0],
              currentDropoff?.coordinates[1]
            ]}
            route={route}
            myLocationButtonStyle={styles.locationButton}
          />
        )}
      <View style={styles.cardsContainer}>
        {!isLoadingEstimate && estimateData && (
          <AnimatedCard>
            <RideConfirmationCard
              onPressButton={onConfirmLocation}
              estimateInfo={estimateData}
              noDriversAvailable={estimateData.nearbyDrivers.length === 0}
              onPressCancelButton={onCancel}
            />
          </AnimatedCard>
        )}
        {isLoadingEstimate && (
          <AnimatedCard>
            <GenericCard
              title="Loading..."
              subtitle="Please wait while we fetch the ride estimate"
            />
          </AnimatedCard>
        )}
        {estimateError && (
          <AnimatedCard>
            <GenericCard
              title="No available drivers"
              subtitle={estimateError as string}
              onPressButton={loadRideEstimate}
              buttonText="Retry"
              onPressSecondaryButton={onCancel}
              secondaryButtonText="Cancel"
              secondaryButtonType="secondary"
            />
          </AnimatedCard>
        )}
      </View>
    </View>
  );
};

export default ConfirmRideLocation;

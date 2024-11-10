import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';

import useRoute from '@/src/hooks/use-route';
import {
  useCreateRideRequestRideMutation,
  useEstimateRideMutation
} from '@/src/store/slices/api-slice';
import {
  selectCurrentDropOff,
  selectCurrentPickup
} from '@/src/store/slices/ride-slice';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import AnimatedCard from '../animated-ride-request-card';
import MapView from '../map-view';
import RideConfirmationCard from '../ride-selection';

const ConfirmRideLocation = () => {
  const router = useRouter();
  const { route, fetchRoute } = useRoute();
  const currentPickup = useSelector(selectCurrentPickup);
  const currentDropoff = useSelector(selectCurrentDropOff);

  const [
    createRideRequest,
    { data: rideRequestResponse, error: rideRequestError }
  ] = useCreateRideRequestRideMutation();
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

  const loadRideEstimate = async () => {
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
        }
      });
      if (!response || !response.data || !response.data) {
        console.log(
          `Error fetching ride estimate: ${JSON.stringify(response)}`
        );
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.log(`Error fetching ride estimate: ${JSON.stringify(error)}`);
      Alert.alert('Error', error.message);
    }
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
      console.log(`Creating ride request...`);

      const response = await createRideRequest({
        pickupLocation: {
          address: currentPickup.address,
          latitude: currentPickup.coordinates[1],
          longitude: currentPickup.coordinates[0]
        },
        dropOffLocation: {
          address: currentDropoff.address,
          latitude: currentDropoff.coordinates[1],
          longitude: currentDropoff.coordinates[0]
        }
      });
      console.log(`createRideRequest response: ${JSON.stringify(response)}`);

      // Navigate to the DriverLookup screen with rideRequestId when successful
      if (response?.data?.rideRequestId) {
        router.push('/lookup-driver');
      }
    } catch (error) {
      console.log(`Error creating ride request: ${JSON.stringify(error)}`);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            myLocationButtonStyle={{ bottom: 300 }}
          />
        )}
      <View
        style={{ position: 'absolute', bottom: 0, width: '100%', padding: 20 }}
      >
        {(estimateData || estimateError) && !rideRequestResponse && (
          <AnimatedCard>
            <RideConfirmationCard
              onPressButton={onConfirmLocation}
              estimateInfo={estimateData}
              noDriversAvailable={
                !estimateData || estimateData?.nearbyDrivers.length === 0
              }
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
        {rideRequestError && (
          <AnimatedCard>
            <GenericCard
              title="Error"
              subtitle="Something went wrong. Please try again later."
              onPressButton={onConfirmLocation}
              buttonText="Try Again"
            />
          </AnimatedCard>
        )}
      </View>
    </View>
  );
};

export default ConfirmRideLocation;

import React, { useEffect } from 'react';
import MapView from '../map-view';
import useRoute from '@/src/hooks/use-route';
import {
  selectCurrentDropOff,
  selectCurrentPickup
} from '@/src/store/slices/ride-slice';
import { useSelector } from 'react-redux';
import RideConfirmationCard from '../ride-selection';
import { Alert, View } from 'react-native';
import {
  useCreateRideRequestRideMutation,
  useEstimateRideMutation
} from '@/src/store/slices/api-slice';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import AnimatedCard from '../animated-ride-request-card';
import { useRouter } from 'expo-router';

const ConfirmRideLocation = () => {
  const router = useRouter();
  const { route, loading, error, fetchRoute } = useRoute();
  const currentDropoff = useSelector(selectCurrentDropOff);
  const currentPickup = useSelector(selectCurrentPickup);
  const [
    createRideRequest,
    {
      data: rideRequestResponse,
      isLoading: isLoadingCreateRideRequest,
      error: rideRequestError
    }
  ] = useCreateRideRequestRideMutation();
  const [
    estimateRide,
    { isLoading: isLoadingEstimate, data, error: estimateError }
  ] = useEstimateRideMutation();

  const onInit = () => {
    if (!currentPickup || !currentDropoff) {
      return;
    }
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
    setTimeout(() => loadRideEstimate().then(), 1000);
  };

  useEffect(() => {
    onInit();
  }, [currentDropoff, currentPickup]);

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
      if (response.error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onConfirmLocation = async () => {
    if (!data || data?.nearbyDrivers.length === 0) {
      await loadRideEstimate();
      return;
    }
    try {
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
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onCancelRideRequest = () => {
    router.navigate('/main');
    // TODO: cancel the ride request
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        pickup={[currentPickup?.coordinates[0], currentPickup?.coordinates[1]]}
        dropoff={[
          currentDropoff?.coordinates[0],
          currentDropoff?.coordinates[1]
        ]}
        route={route}
        myLocationButtonStyle={{ bottom: 300 }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 20
        }}
      >
        {(data || estimateError) && !rideRequestResponse && (
          <AnimatedCard>
            <RideConfirmationCard
              onPressButton={onConfirmLocation}
              estimateInfo={data}
              noDriversAvailable={!data || data?.nearbyDrivers.length === 0}
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
        {isLoadingCreateRideRequest && (
          <AnimatedCard>
            <GenericCard
              title="Loading..."
              subtitle="Please wait while we create your ride request"
            />
          </AnimatedCard>
        )}
        {rideRequestError && !isLoadingCreateRideRequest && (
          <AnimatedCard>
            <GenericCard
              title="Error"
              subtitle="Something went wrong. Please try again later."
              onPressButton={onConfirmLocation}
              buttonText="Try Again"
            />
          </AnimatedCard>
        )}
        {rideRequestResponse?.rideRequestId && (
          <AnimatedCard>
            <GenericCard
              title="Looking for drivers..."
              subtitle="Please wait while we look for drivers near your pickup location"
              onPressButton={onCancelRideRequest}
              buttonText="Cancel"
            />
          </AnimatedCard>
        )}
      </View>
    </View>
  );
};

export default ConfirmRideLocation;

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

const ConfirmRideLocation = () => {
  const { route, loading, error, fetchRoute } = useRoute();
  const currentDropoff = useSelector(selectCurrentDropOff);
  const currentPickup = useSelector(selectCurrentPickup);
  const [createRideRequest, { isLoading }] = useCreateRideRequestRideMutation();
  const [estimateRide, { isLoading: isLoadingEstimate, data }] =
    useEstimateRideMutation();

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
    loadRideEstimate().then();
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
      console.log(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onConfirmLocation = async () => {
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
      Alert.alert('Ride Request', response.data.message);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
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
        />
      </View>
      <View
        style={{
          flexGrow: 1,
          flex: 1,
          justifyContent: 'flex-end'
        }}
      >
        {data && (
          <RideConfirmationCard
            onPressButton={onConfirmLocation}
            estimateInfo={data}
          />
        )}
      </View>
    </View>
  );
};

export default ConfirmRideLocation;

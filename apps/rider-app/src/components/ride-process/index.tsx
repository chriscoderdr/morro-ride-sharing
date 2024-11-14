import React, { useEffect, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import useRoute from '@/src/hooks/use-route';
import { MapView } from 'react-native-morro-taxi-rn-components';
import RideRequestDashboard from '../ride-dashboard';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { fetchRideRequest } from '@/src/store/slices/ride-slice';

const RideProcess = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { route, fetchRoute } = useRoute();
  const currentRide = useSelector((state: RootState) => state.ride);

  // Helper functions to retrieve coordinates
  const getPickupCoordinates = useCallback(
    () => currentRide?.pickup?.coordinates,
    [currentRide]
  );
  const getDropoffCoordinates = useCallback(
    () => currentRide?.dropoff?.coordinates,
    [currentRide]
  );
  const getDriverCoordinates = useCallback(
    () => currentRide?.driver?.location || null,
    [currentRide]
  );

  // Update route based on ride status and locations
  const updateRoute = useCallback(() => {
    if (!currentRide) return;
    const { status, driver, pickup, dropoff } = currentRide;

    if (
      ['accepted', 'started'].includes(status) &&
      driver?.location &&
      pickup
    ) {
      fetchRoute([
        { latitude: driver.location[1], longitude: driver.location[0] },
        { latitude: pickup.coordinates[1], longitude: pickup.coordinates[0] }
      ]);
    } else if (status === 'picked-up' && driver?.location && dropoff) {
      fetchRoute([
        { latitude: driver.location[1], longitude: driver.location[0] },
        { latitude: dropoff.coordinates[1], longitude: dropoff.coordinates[0] }
      ]);
    }
  }, [currentRide]);

  // Redirect if no ride request ID or if the ride is completed
  useEffect(() => {
    if (!currentRide?.rideRequestId || currentRide.status === 'completed') {
      if (router.canDismiss() && router.canGoBack()) {
        router.dismissAll();
      } else {
        router.replace('/main');
      }
    }
  }, [currentRide, router]);

  // Poll for current ride request every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchRideRequest({}));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Update route when current ride status changes
  useEffect(() => {
    updateRoute();
  }, [currentRide, updateRoute]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        pickup={
          ['accepted', 'started'].includes(currentRide?.status)
            ? getPickupCoordinates()
            : undefined
        }
        dropoff={getDropoffCoordinates()}
        route={route}
        myLocationButtonStyle={{ bottom: 300 }}
        points={
          getDriverCoordinates()
            ? [
                {
                  coordinates: getDriverCoordinates(),
                  iconImage: 'carIcon',
                  pointId: 'driver',
                  title: 'Driver'
                }
              ]
            : []
        }
      />
      <View
        style={{ position: 'absolute', bottom: 0, width: '100%', padding: 20 }}
      >
        <RideRequestDashboard />
      </View>
    </View>
  );
};

export default RideProcess;

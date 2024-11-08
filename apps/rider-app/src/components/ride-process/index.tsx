import React, { useEffect, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import RideProcessCard from '../ride-process-card';
import MapView from '@/src/components/map-view';
import useRoute from '@/src/hooks/use-route';
import { useLazyCurrentRideRequestQuery } from '@/src/store/slices/api-slice';

const RideProcess = () => {
  const router = useRouter();
  const { route, fetchRoute } = useRoute();
  const [fetchCurrentRideRequest, { data: currentRide }] =
    useLazyCurrentRideRequestQuery();

  const screenWidth = Dimensions.get('window').width;

  // Helper function to get coordinates in [longitude, latitude] format
  const getCoordinates = (location) =>
    location ? [location.longitude, location.latitude] : null;

  const getPickupCoordinates = useCallback(
    () => getCoordinates(currentRide?.pickupLocation),
    [currentRide]
  );

  const getDropoffCoordinates = useCallback(
    () => getCoordinates(currentRide?.tripLocation),
    [currentRide]
  );

  const getDriverCoordinates = useCallback(() => {
    const driverLocation = currentRide?.driver?.location;
    return driverLocation ? [driverLocation[0], driverLocation[1]] : null;
  }, [currentRide]);

  const updateRoute = useCallback(() => {
    if (!currentRide) return;

    const { status, driver, pickupLocation, tripLocation } = currentRide;

    if (
      (status === 'accepted' || status === 'started') &&
      driver?.location &&
      pickupLocation
    ) {
      // Route from driver to pickup location
      fetchRoute([
        { latitude: driver.location[1], longitude: driver.location[0] },
        {
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude
        }
      ]);
    } else if (status === 'picked-up' && driver?.location && tripLocation) {
      // Route from driver to drop-off location
      fetchRoute([
        { latitude: driver.location[1], longitude: driver.location[0] },
        { latitude: tripLocation.latitude, longitude: tripLocation.longitude }
      ]);
    }
  }, [currentRide, fetchRoute]);

  // Polling for current ride request every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCurrentRideRequest()
        .unwrap()
        .then((response) => {
          console.log(
            'Ride request response:',
            JSON.stringify(response, null, 2)
          );
        })
        .catch((error) => {
          console.error('Error fetching ride request:', error);
        });
    }, 10000);
    return () => clearInterval(intervalId);
  }, [fetchCurrentRideRequest]);

  // Update route when current ride status changes
  useEffect(() => {
    updateRoute();
  }, [currentRide, updateRoute]);

  const onCancelRideRequest = () => {
    router.navigate('/main');
  };

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
        <RideProcessCard
          currentRide={currentRide}
          onCancelRideRequest={onCancelRideRequest}
        />
      </View>
    </View>
  );
};

export default RideProcess;

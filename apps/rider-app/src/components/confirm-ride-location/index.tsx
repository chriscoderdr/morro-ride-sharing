import React, { useEffect } from 'react';
import MapView from '../map-view';
import useRoute from '@/src/hooks/use-route';
import {
  selectCurrentDropOff,
  selectCurrentPickup
} from '@/src/store/slices/ride-slice';
import { useSelector } from 'react-redux';
import RideSelection from '../ride-selection';
import { View } from 'react-native';

const ConfirmRideLocation = () => {
  const { route, loading, error, fetchRoute } = useRoute();
  const currentDropoff = useSelector(selectCurrentDropOff);
  const currentPickup = useSelector(selectCurrentPickup);

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
  };

  useEffect(() => {
    onInit();
  }, [currentDropoff, currentPickup]);

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
        <RideSelection />
      </View>
    </View>
  );
};

export default ConfirmRideLocation;

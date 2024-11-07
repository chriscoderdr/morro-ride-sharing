import React, { useEffect } from 'react';
import MapView from '../map-view';
import useRoute from '@/src/hooks/use-route';

const ConfirmRideLocation = () => {
  const { route, loading, error, fetchRoute } = useRoute();

  const onInit = () => {
    fetchRoute([
      { latitude: 14.1857276, longitude: 121.1217362 },
      {
        latitude: 14.175127,
        longitude: 121.122798
      }
    ]);
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <>
      <MapView
        pickup={[121.1217362, 14.1857276]}
        dropoff={[121.122798, 14.175127]}
        route={route}
      />
    </>
  );
};

export default ConfirmRideLocation;

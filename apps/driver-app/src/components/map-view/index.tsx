import { RideRequest } from '@/src/api/models';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import useRoute from '@/src/hooks/use-route';
import { Coordinates } from '@/src/services/map-service';
import { initializePendingRequests } from '@/src/store/middleware/timeout-middleware';
import { selectCurrentRideRequest } from '@/src/store/slices/ride-request-slice';
import { haversineDistance } from '@/src/utils/location-utils';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapView } from 'react-native-morro-taxi-rn-components';
import Mapbox from '@rnmapbox/maps';

const MainView = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const { route, fetchRoute } = useRoute();
  const dispatch = useAppDispatch();

  const currentRideRequest = useSelector(
    selectCurrentRideRequest
  ) as RideRequest | null;
  const fetchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchedRequestIdRef = useRef<string | null>(null);
  const lastFetchedRequestLocation = useRef<[number, number] | null>(null);

  const pickupCoords = () => ({
    latitude: currentRideRequest?.pickupLocation?.latitude || 0,
    longitude: currentRideRequest?.pickupLocation?.longitude || 0
  });

  const dropoffCoords = () => ({
    latitude: currentRideRequest?.tripLocation?.latitude || 0,
    longitude: currentRideRequest?.tripLocation?.longitude || 0
  });

  const fetchRouteForCurrentRide = () => {
    if (!currentRideRequest || !userLocation) return;

    const pickupLocation =
      currentRideRequest.status !== 'picked-up' ? pickupCoords() : userLocation;
    fetchRoute(userLocation, pickupLocation, dropoffCoords());
    lastFetchedRequestIdRef.current = currentRideRequest.rideRequestId;
    lastFetchedRequestLocation.current = [
      userLocation.latitude,
      userLocation.longitude
    ];
  };

  const hasUserLastFetchedLocationChanged = () => {
    if (!lastFetchedRequestLocation.current || !userLocation) return false;
    const [lastLat, lastLon] = lastFetchedRequestLocation.current;
    return (
      haversineDistance(
        lastLat,
        lastLon,
        userLocation.latitude,
        userLocation.longitude
      ) > 100
    );
  };

  useEffect(() => {
    if (userLocation && (hasRide() || !isMapInitialized)) {
      if (
        hasInProgressRide() ||
        !isMapInitialized ||
        hasUserLastFetchedLocationChanged()
      ) {
        cameraRef.current?.setCamera({
          centerCoordinate: [userLocation.longitude, userLocation.latitude],
          zoomLevel: hasInProgressRide() ? 16 : 12,
          animationDuration: 2000
        });
        setIsMapInitialized(true);
      }

      if (
        currentRideRequest &&
        (lastFetchedRequestIdRef.current !== currentRideRequest.rideRequestId ||
          hasUserLastFetchedLocationChanged())
      ) {
        clearInterval(fetchIntervalRef.current as NodeJS.Timeout);
        fetchRouteForCurrentRide();
        dispatch(initializePendingRequests());

        fetchIntervalRef.current = setInterval(() => {
          fetchRouteForCurrentRide();
          dispatch(initializePendingRequests());
        }, 60000);
      }
    }

    return () => clearInterval(fetchIntervalRef.current as NodeJS.Timeout);
  }, [userLocation, currentRideRequest]);

  const hasInProgressRide = () =>
    currentRideRequest &&
    ['started', 'picked-up'].includes(currentRideRequest.status);
  const hasRide = () => !!currentRideRequest;

  const handleOnUserLocationUpdate = (location: Coordinates) =>
    setUserLocation(location);

  return (
    <MapView
      pickup={[pickupCoords().longitude, pickupCoords().latitude]}
      dropoff={[dropoffCoords().longitude, dropoffCoords().latitude]}
      route={currentRideRequest ? route : undefined}
      onUserLocationUpdate={handleOnUserLocationUpdate}
    />
  );
};

export default MainView;

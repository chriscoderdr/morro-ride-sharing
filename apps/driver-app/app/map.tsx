import useUserLocation from '@/src/hooks/use-user-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';

import RideRequestCard from '@/src/components/ride-request-card';
import TripCompleteCard from '@/src/components/trip-complete-card';
import TripInProgressCard from '@/src/components/trip-in-progress-card';
import TripStartCard from '@/src/components/trip-start-card';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import {
  acceptRideRequest,
  completeRideRequest,
  pickUpRideRequest,
  RideRequest,
  startRideRequest
} from '@/src/store/slices/ride-request-slice';

export default function Map() {
  const dispatch = useAppDispatch();

  const { location: userLocation, fetchUserLocation } = useUserLocation();
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const rideRequests = useSelector(
    (state: any) => state.rideRequest.requests
  ) as RideRequest[];

  useEffect(() => {
    if (userLocation && !isMapInitialized) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000
      });
      setIsMapInitialized(true);
    }
  }, [userLocation, isMapInitialized]);

  const handleZoomToUserLocation = () => {
    if (userLocation) {
      cameraRef.current?.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000
      });
    } else {
      Alert.alert('Location Error', 'Unable to retrieve user location.');
    }
  };

  const handleConfirmPickup = (rideRequestId: string) => {
    const data = async () => {
      try {
        await dispatch(pickUpRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to confirm rider pickup.');
      }
    };
    data().catch(() => console.error('Error confirming pickup'));
  };

  const handleAcceptRide = (rideRequestId: string) => {
    const data = async () => {
      console.log(`Accepting ride request: ${rideRequestId}`);
      try {
        await dispatch(acceptRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to accept the ride request.');
      }
    };
    data().catch(() => {
      console.error('Error accepting ride request');
    });
  };

  const handleStartTrip = (rideRequestId: string) => {
    const data = async () => {
      console.log(`Starting trip for request: ${rideRequestId}`);
      try {
        await dispatch(startRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to start the trip.');
      }
    };
    data().catch(() => {
      console.error('Error starting trip');
    });
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

  const handleCompleteTrip = (rideRequestId: string) => {
    const data = async () => {
      try {
        await dispatch(completeRideRequest({ rideRequestId })).unwrap();
      } catch (error) {
        Alert.alert('Error', 'Failed to complete the trip.');
      }
    };
    data().catch(() => console.error('Error completing trip'));
  };

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera ref={cameraRef} />
        <Mapbox.LocationPuck
          visible
          topImage="topImage"
          puckBearingEnabled
          pulsing={{
            isEnabled: true,
            color: '#CCCCCC',
            radius: 50.0
          }}
        />
        <Mapbox.Images>
          <Mapbox.Image name="topImage">
            <View
              style={{
                borderColor: '#FFFFFF',
                borderWidth: 2,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MaterialIcons name="navigation" size={30} color="#5588FF" />
            </View>
          </Mapbox.Image>
        </Mapbox.Images>
      </Mapbox.MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={handleZoomToUserLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>

      {/* Display RideRequestCard for each request with status 'pending' */}
      {rideRequests
        .filter((request) => request.status === 'pending')
        .map((request) => (
          <RideRequestCard
            key={request.rideRequestId}
            rideRequest={request}
            onAccept={() => handleAcceptRide(request.rideRequestId)}
          />
        ))}

      {/* Display TripStartCard for each request with status 'accepted' */}
      {rideRequests
        .filter((request) => request.status === 'accepted')
        .map((request) => (
          <TripStartCard
            key={request.rideRequestId}
            rideRequest={request}
            onCallRider={() => handleCallRider(request.riderPhone || '')}
            onStartTrip={() => handleStartTrip(request.rideRequestId)}
          />
        ))}

      {/* Display TripInProgressCard for each request with status 'started' */}
      {rideRequests
        .filter((request) => request.status === 'started')
        .map((request) => (
          <TripInProgressCard
            key={request.rideRequestId}
            rideRequest={request}
            onCallRider={() => handleCallRider(request.riderPhone || '')}
            onPickUpRider={() => handleConfirmPickup(request.rideRequestId)}
          />
        ))}

      {/* Display TripInProgressCard for each request with status 'started' */}
      {rideRequests
        .filter((request) => request.status === 'picked-up')
        .map((request) => (
          <TripCompleteCard
            key={request.rideRequestId}
            rideRequest={request}
            onCompleteTrip={() => handleCompleteTrip(request.rideRequestId)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

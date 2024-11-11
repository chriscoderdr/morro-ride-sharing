import { RideRequest } from '@/src/api/models';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import {
  clearRide,
  completeRide,
  RideState
} from '@/src/store/slices/ride-slice';
import { useAppDispatch } from '@/src/hooks/use-app-dispatch';

interface RideCardProps {
  ride: RideState;
  type:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  onAccept?: (rideRequestId: string) => void;
  onStartRide?: (rideRequestId: string) => void;
  onPickUpRider?: (rideRequestId: string) => void;
  onCompleteTrip?: (rideRequestId: string) => void;
  onCallRider?: (riderPhone: string) => void;
}

const RideCard: React.FC<RideCardProps> = ({
  ride,
  type,
  onAccept,
  onStartRide,
  onPickUpRider,
  onCompleteTrip,
  onCallRider
}) => {
  const {} = ride;

  const dispatch = useAppDispatch();

  const getButtonConfig = () => {
    switch (type) {
      case 'pending':
        return {
          title: 'Searching for Drivers',
          subtitle: 'Currently looking for available drivers',
          buttonText: 'Cancel',
          action: () => {
            dispatch(clearRide());
          } // Use this to call onAccept if needed: () => onAccept && onAccept(rideRequestId)
        };
      case 'accepted':
        return {
          title: 'Driver Accepted',
          subtitle: 'The driver has accepted your request'
        };
      case 'started':
        return {
          title: 'Driver En Route',
          subtitle: 'The driver is on the way to your location'
        };
      case 'picked-up':
        return {
          title: 'Heading to Destination',
          subtitle: 'On the way to the destination'
        };
      case 'dropped-off':
        return {
          title: 'Trip Completed',
          subtitle: 'Your trip is complete',
          buttonText: 'Done',
          action: () => {
            dispatch(completeRide());
          }
        };
      case 'declined':
        return {
          title: 'Request Declined',
          subtitle: 'The request was declined',
          buttonText: 'OK',
          action: undefined
        };
      default:
        return {
          title: '',
          subtitle: '',
          buttonText: '',
          action: undefined
        };
    }
  };

  const {
    buttonText,
    action: onPressButton,
    title,
    subtitle
  } = getButtonConfig();

  return (
    <GenericCard
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      onPressButton={onPressButton}
      buttonType={
        type === 'declined' || type === 'picked-up' ? 'secondary' : 'primary'
      }
    >
      <View style={styles.riderInfoContainer}>
        {ride.driver && (
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>Driver: {ride.driver?.name}</Text>
            {type !== 'pending' &&
              type !== 'declined' &&
              type !== 'dropped-off' && (
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() =>
                    onCallRider && onCallRider(ride.driver.phone || '')
                  }
                >
                  <Ionicons name="call-outline" size={24} color="#007AFF" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              )}
          </View>
        )}
      </View>
      {type === 'pending' && ride.pickup.address && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>From: {ride.pickup.address}</Text>
          <Text style={styles.infoText}>To: {ride.dropoff.address}</Text>
        </View>
      )}
    </GenericCard>
  );
};

export default RideCard;

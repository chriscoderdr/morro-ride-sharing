import { RideRequest } from '@/src/api/models';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { GenericCard } from 'react-native-morro-taxi-rn-components';

interface RideCardProps {
  rideRequest: RideRequest;
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
  rideRequest,
  type,
  onAccept,
  onStartRide,
  onPickUpRider,
  onCompleteTrip,
  onCallRider
}) => {
  const {
    rideRequestId,
    estimatedPrice,
    riderName,
    riderPhone,
    pickupLocation,
    tripLocation
  } = rideRequest;

  const getButtonConfig = () => {
    switch (type) {
      case 'pending':
        return {
          text: 'Accept',
          action: () => onAccept && onAccept(rideRequestId)
        };
      case 'accepted':
        return {
          text: 'Start Trip',
          action: () => onStartRide && onStartRide(rideRequestId)
        };
      case 'started':
        return {
          text: 'Pick Up Rider',
          action: () => onPickUpRider && onPickUpRider(rideRequestId)
        };
      case 'picked-up':
        return {
          text: 'Complete Trip',
          action: () => onCompleteTrip && onCompleteTrip(rideRequestId)
        };
      case 'dropped-off':
        return { text: 'Trip Complete', action: undefined };
      case 'declined':
        return { text: 'Request Declined', action: undefined };
      default:
        return { text: '', action: undefined };
    }
  };

  const { text: buttonText, action: onPressButton } = getButtonConfig();

  // Define distance and time display based on status
  const getDistanceDisplay = () => {
    if (type === 'pending') {
      return `Pickup: ${rideRequest.pickupTimeDistance?.time} (${rideRequest.pickupTimeDistance?.distance}), 
              Trip: ${rideRequest.tripTimeDistance?.time} (${rideRequest.tripTimeDistance?.distance})`;
    }
    if (type === 'started') {
      return `Pickup Distance: ${rideRequest.pickupTimeDistance?.time} (${rideRequest.pickupTimeDistance?.distance}) away`;
    }
    if (type === 'picked-up') {
      return `Trip Distance: ${rideRequest.tripTimeDistance?.time} (${rideRequest.tripTimeDistance?.distance}) away`;
    }
    return '';
  };

  return (
    <GenericCard
      title={type === 'pending' ? `₱${estimatedPrice}` : getDistanceDisplay()}
      subtitle={type === 'pending' ? `${getDistanceDisplay()}` : undefined}
      buttonText={buttonText}
      onPressButton={onPressButton}
      buttonType={
        type === 'declined' || type === 'picked-up' ? 'secondary' : 'primary'
      }
    >
      {riderName && (
        <View style={styles.riderInfoContainer}>
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>Rider: {riderName}</Text>
            {type !== 'pending' &&
              type !== 'declined' &&
              type !== 'dropped-off' && (
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => onCallRider && onCallRider(riderPhone || '')}
                >
                  <Ionicons name="call-outline" size={24} color="#007AFF" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      )}
      {type === 'pending' && pickupLocation && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{pickupLocation.address}</Text>
        </View>
      )}
      {(type === 'pending' || type === 'picked-up' || type === 'accepted') && (
        <View style={styles.infoContainer}>
          <Text style={styles.locationText}>
            {rideRequest.tripTimeDistance?.time} (
            {rideRequest.tripTimeDistance?.distance}) trip
          </Text>
          <Text style={styles.infoText}>{tripLocation?.address}</Text>
        </View>
      )}
      {type === 'started' && (
        <View style={styles.infoContainer}>
          <Text style={styles.locationText}>
            {rideRequest.pickupTimeDistance?.time} (
            {rideRequest.pickupTimeDistance?.distance}) pickup
          </Text>
          <Text style={styles.infoText}>{pickupLocation?.address}</Text>
        </View>
      )}
    </GenericCard>
  );
};

export default RideCard;

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RideRequestCardProps } from './props';
import { styles } from './styles';

const RideRequestCard: React.FC<RideRequestCardProps> = ({
  rideRequest,
  onAccept
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceText}>{rideRequest.estimatedPrice}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {rideRequest.pickupTimeDistance?.time} (
          {rideRequest.pickupTimeDistance?.distance}) away
        </Text>
        <Text style={styles.locationText}>
          {rideRequest.pickupLocation?.address}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {rideRequest.tripTimeDistance?.time} (
          {rideRequest.tripTimeDistance?.distance}) trip
        </Text>
        <Text style={styles.locationText}>
          {rideRequest.tripLocation?.address}
        </Text>
      </View>

      <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideRequestCard;

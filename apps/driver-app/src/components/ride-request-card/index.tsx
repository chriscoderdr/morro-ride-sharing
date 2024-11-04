import GenericCard from '@/src/components/generic-card';
import React from 'react';
import { Text, View } from 'react-native';
import { IRideRequestCardProps } from './props';
import { styles } from './styles';

const RideRequestCard: React.FC<IRideRequestCardProps> = ({
  rideRequest,
  onAccept
}) => {
  return (
    <GenericCard
      buttonType="primary"
      title={`$${rideRequest.estimatedPrice}`}
      subtitle={`${rideRequest.pickupTimeDistance?.time} (${rideRequest.pickupTimeDistance?.distance}) away`}
      buttonText="Accept"
      onPressButton={onAccept}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {rideRequest.pickupLocation?.address}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.locationText}>
          {rideRequest.tripTimeDistance?.time} (
          {rideRequest.tripTimeDistance?.distance}) trip
        </Text>
        <Text style={styles.infoText}>{rideRequest.tripLocation?.address}</Text>
      </View>
    </GenericCard>
  );
};

export default RideRequestCard;

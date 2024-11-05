import GenericCard from '@/src/components/generic-card';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ITripInProgressCardProps } from './props';
import { styles } from './styles';

const TripInProgressCard: React.FC<ITripInProgressCardProps> = ({
  rideRequest,
  onPickUpRider,
  onCallRider
}) => {
  return (
    <GenericCard
      title={`${rideRequest.pickupTimeDistance?.time} • ${rideRequest.pickupTimeDistance?.distance} away`}
      buttonText="Pick Up Rider"
      onPressButton={onPickUpRider}
      buttonType="primary"
    >
      <View style={styles.riderInfoContainer}>
        <View style={styles.riderDetails}>
          <Text style={styles.riderName}>Rider: {rideRequest.riderName}</Text>
          <TouchableOpacity style={styles.callButton} onPress={onCallRider}>
            <Ionicons name="call-outline" size={24} color="#007AFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://placekitten.com/50/50' }}
          style={styles.riderIcon}
        />
      </View>
    </GenericCard>
  );
};

export default TripInProgressCard;

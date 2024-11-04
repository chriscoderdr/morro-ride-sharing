import GenericCard from '@/src/components/generic-card';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ITripStartCardProps } from './props';
import { styles } from './styles';

const TripStartCard: React.FC<ITripStartCardProps> = ({
  rideRequest,
  onStartTrip,
  onCallRider
}) => {
  return (
    <GenericCard
      title={`${rideRequest.pickupTimeDistance?.time} • ${rideRequest.tripTimeDistance?.distance} away`}
      buttonText="Start Trip"
      onPressButton={onStartTrip}
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

export default TripStartCard;

import { RideRequestState } from '@/src/store/slices/ride-request-slice';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TripStartCard = ({
  rideRequest,
  onStartTrip,
  onCallRider
}: {
  rideRequest: RideRequestState;
  onStartTrip: () => void;
  onCallRider: () => void;
}) => {
  return (
    <View style={styles.container}>
      {/* Time and Distance to Pickup Point */}
      <Text style={styles.timeDistanceText}>
        {rideRequest.pickupTimeDistance.time} • {rideRequest.tripTimeDistance.distance} away
      </Text>

      {/* Rider's Information */}
      <View style={styles.riderInfoContainer}>
        <View style={styles.riderDetails}>
          <Text style={styles.riderName}>Rider: {rideRequest.riderName}</Text>
          <TouchableOpacity style={styles.callButton} onPress={onCallRider}>
            <Ionicons name="call-outline" size={24} color="#007AFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Rider Icon */}
        <Image
          source={{ uri: 'https://placekitten.com/50/50' }} // Replace with rider's image URL if available
          style={styles.riderIcon}
        />
      </View>

      {/* Distance Restriction */}
      <Text style={styles.distanceRestrictionText}>
        You cannot start until you're within 1 km of the pickup location.
      </Text>

      {/* Start Trip Button */}
      <TouchableOpacity style={styles.startButton} onPress={onStartTrip}>
        <Text style={styles.startButtonText}>Start Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10
  },
  timeDistanceText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  riderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  riderDetails: {
    flex: 1,
    marginRight: 10
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  callButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 5
  },
  riderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd'
  },
  distanceRestrictionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default TripStartCard;

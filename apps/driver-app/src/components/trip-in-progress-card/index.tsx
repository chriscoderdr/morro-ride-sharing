import { RideRequest } from '@/src/store/slices/ride-request-slice';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TripInProgressCard = ({
  rideRequest,
  onPickUpRider,
  onCallRider
}: {
  rideRequest: RideRequest;
  onPickUpRider: () => void;
  onCallRider: () => void;
}) => {
  return (
    <View style={styles.container}>
      {/* Time and Distance Information */}
      <Text style={styles.timeDistanceText}>
        {rideRequest.pickupTimeDistance?.time} •{' '}
        {rideRequest.tripTimeDistance?.distance} away
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

      {/* Pick Up Rider Button */}
      <TouchableOpacity style={styles.startButton} onPress={onPickUpRider}>
        <Text style={styles.startButtonText}>Pick Up Rider</Text>
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

export default TripInProgressCard;
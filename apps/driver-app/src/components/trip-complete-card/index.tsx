import { RideRequestState } from '@/src/store/slices/ride-request-slice';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TripCompleteCard = ({
  rideRequest,
  onCompleteTrip
}: {
  rideRequest: RideRequestState;
  onCompleteTrip: () => void;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeToDestinationText}>
        {rideRequest.tripTimeDistance} to destination
      </Text>

      <View style={styles.riderInfoContainer}>
        <MaterialIcons
          name="person"
          size={30}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.riderNameText}>{rideRequest.riderName} </Text>
      </View>

      <View style={styles.destinationInfoContainer}>
        <Text style={styles.infoText}>Destination</Text>
        <Text style={styles.locationText}>
          {rideRequest.tripLocation?.address}
        </Text>
      </View>

      <TouchableOpacity style={styles.completeButton} onPress={onCompleteTrip}>
        <Text style={styles.completeButtonText}>Complete Trip</Text>
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
  timeToDestinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    textAlign: 'center'
  },
  riderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  icon: {
    marginRight: 10
  },
  riderNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  destinationInfoContainer: {
    marginVertical: 10
  },
  infoText: {
    fontSize: 16,
    color: '#666'
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  completeButton: {
    marginTop: 20,
    backgroundColor: '#CC0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center'
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default TripCompleteCard;

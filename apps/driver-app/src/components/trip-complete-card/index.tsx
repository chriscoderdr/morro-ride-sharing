import GenericCard from '@/src/components/generic-card';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { styles } from './styles';

const TripCompleteCard = ({
  rideRequest,
  onCompleteTrip
}: ITripCompleteCardProps) => {
  return (
    <GenericCard
      title={`${rideRequest.tripTimeDistance.time} to destination`}
      buttonText="Complete Trip"
      onPressButton={onCompleteTrip}
      buttonType="secondary"
    >
      <View style={styles.riderInfoContainer}>
        <MaterialIcons
          name="person"
          size={30}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.riderNameText}>{rideRequest.riderName}</Text>
      </View>

      <View style={styles.destinationInfoContainer}>
        <Text style={styles.infoText}>Destination</Text>
        <Text style={styles.locationText}>
          {rideRequest.tripLocation?.address}
        </Text>
      </View>
    </GenericCard>
  );
};

export default TripCompleteCard;

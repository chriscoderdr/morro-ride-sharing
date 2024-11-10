import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { ITripCompleteCardProps } from './props';
import { styles } from './styles';
import { GenericCard } from 'react-native-morro-taxi-rn-components';

const TripCompleteCard = ({
  rideRequest,
  onCompleteTrip
}: ITripCompleteCardProps) => {
  return (
    <GenericCard
      title={`Charge the rider: $${rideRequest.estimatedPrice}`}
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

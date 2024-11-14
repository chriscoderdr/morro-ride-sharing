import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import { RideCardProps } from './props';

const RideCard: React.FC<RideCardProps> = ({
  ride,
  type,
  onCompleteTrip,
  onCallDriver,
  onCancelRide
}) => {
  const {} = ride;
  const getButtonConfig = () => {
    switch (type) {
      case 'pending':
        return {
          title: 'Searching for Drivers',
          subtitle: 'Currently looking for available drivers',
          buttonText: 'Cancel',
          action: () => {
            onCancelRide && onCancelRide();
          }
        };
      case 'accepted':
        return {
          title: 'Driver Accepted',
          subtitle: 'The driver has accepted your request'
        };
      case 'started':
        return {
          title: 'Driver En Route',
          subtitle: 'The driver is on the way to your location'
        };
      case 'picked-up':
        return {
          title: 'Heading to Destination',
          subtitle: 'On the way to the destination'
        };
      case 'dropped-off':
        return {
          title: 'Trip Completed',
          subtitle: `Your trip is complete\n Pay the driver ₱${ride.estimatePrice}`,
          buttonText: 'Done',
          action: () => {
            onCompleteTrip && onCompleteTrip();
          }
        };
      case 'declined':
        return {
          title: 'Request Declined',
          subtitle: 'The request was declined',
          buttonText: 'OK',
          action: () => {
            onCancelRide && onCancelRide();
          }
        };
      default:
        return {
          title: '',
          subtitle: '',
          buttonText: '',
          action: undefined
        };
    }
  };

  const {
    buttonText,
    action: onPressButton,
    title,
    subtitle
  } = getButtonConfig();

  return (
    <GenericCard
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      onPressButton={onPressButton}
      buttonType={
        type === 'declined' || type === 'picked-up' ? 'secondary' : 'primary'
      }
    >
      <View style={styles.riderInfoContainer}>
        {ride.driver && (
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>Driver: {ride.driver?.name}</Text>
            {type !== 'pending' &&
              type !== 'declined' &&
              type !== 'dropped-off' && (
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() =>
                    onCallDriver && onCallDriver(ride.driver.phone || '')
                  }
                >
                  <Ionicons name="call-outline" size={24} color="#007AFF" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              )}
          </View>
        )}
      </View>
      {type === 'pending' && ride.pickup.address && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>From: {ride.pickup.address}</Text>
          <Text style={styles.infoText}>To: {ride.dropoff.address}</Text>
        </View>
      )}
    </GenericCard>
  );
};

export default RideCard;

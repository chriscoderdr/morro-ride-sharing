import { View } from 'react-native';
import { GenericCard } from 'react-native-morro-taxi-rn-components';

const RideConfirmationCard = ({ onPressButton, estimateInfo }) => {
  const title = `Ride Estimate: ₱${estimateInfo.estimatePrice}`;
  const subtitle =
    `Pickup ETA: ${estimateInfo.pickup.time} (${estimateInfo.pickup.distance}) away\n` +
    `Drop-off: ${estimateInfo.dropOff.time} (${estimateInfo.dropOff.distance})\n\n` +
    `Drivers nearby: ${estimateInfo.nearbyDrivers.length > 0 ? 'Available' : 'Unavailable'}`;

  return (
    <GenericCard
      title={title}
      subtitle={subtitle}
      buttonType="primary"
      buttonText="Confirm"
      onPressButton={onPressButton}
    />
  );
};

export default RideConfirmationCard;

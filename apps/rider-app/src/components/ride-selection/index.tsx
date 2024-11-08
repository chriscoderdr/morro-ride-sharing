import { View } from 'react-native';
import { GenericCard } from 'react-native-morro-taxi-rn-components';

const RideConfirmationCard = ({
  onPressButton,
  estimateInfo,
  noDriversAvailable
}) => {
  const title = noDriversAvailable
    ? 'No Drivers Available'
    : `Ride Estimate: ₱${estimateInfo.estimatePrice}`;

  const subtitle = noDriversAvailable
    ? 'Sorry, there are no drivers available near your pickup location right now. Please try again later.'
    : `Pickup ETA: ${estimateInfo.pickup.time} (${estimateInfo.pickup.distance}) away\n` +
      `Drop-off: ${estimateInfo.dropOff.time} (${estimateInfo.dropOff.distance})\n\n` +
      `Drivers nearby: ${estimateInfo.nearbyDrivers.length > 0 ? 'Available' : 'Unavailable'}`;

  const buttonText = noDriversAvailable ? 'Try Again' : 'Confirm';

  return (
    <GenericCard
      title={title}
      subtitle={subtitle}
      buttonType="primary"
      buttonText={buttonText}
      onPressButton={onPressButton}
    />
  );
};

export default RideConfirmationCard;

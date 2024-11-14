import React from 'react';
import { View, Dimensions } from 'react-native';
import { GenericCard } from 'react-native-morro-taxi-rn-components';
import AnimatedCard from '../animated-ride-request-card';

const RideProcessCard = ({ currentRide, onCancelRideRequest }) => {
  const screenWidth = Dimensions.get('window').width;

  const renderSubtitle = () => {
    if (!currentRide) {
      return 'Please wait while we look for drivers near your pickup location.';
    }

    const { driver, pickupTimeDistance, tripTimeDistance, estimatePrice } =
      currentRide;

    if (!driver) {
      return 'Searching for a driver...';
    }

    return (
      `Driver: ${driver.name}\nPhone: ${driver.phone}\n\n` +
      `Pickup ETA: ${pickupTimeDistance?.time} (${pickupTimeDistance?.distance})\n` +
      `Trip ETA: ${tripTimeDistance?.time} (${tripTimeDistance?.distance})\n\n` +
      `Estimated Fare: ₱${estimatePrice}`
    );
  };

  const getStatusTitle = () => {
    if (!currentRide) return 'Finding drivers...';

    const { status } = currentRide;

    switch (status) {
      case 'pending':
        return 'Ride Request Pending';
      case 'accepted':
        return 'Driver Accepted Your Ride!';
      case 'started':
        return 'Driver is On the Way!';
      case 'picked-up':
        return 'Enjoy Your Ride!';
      case 'dropped-off':
        return 'You Have Arrived!';
      case 'declined':
        return 'No Drivers Available';
      default:
        return 'Looking for drivers...';
    }
  };

  const isCancelable = currentRide?.status === 'pending';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedCard>
        <GenericCard
          title={getStatusTitle()}
          subtitle={renderSubtitle()}
          buttonText={isCancelable ? 'Cancel Ride' : 'Close'}
          onPressButton={isCancelable ? onCancelRideRequest : null}
          secondaryButtonText="close"
          onPressSecondaryButton={onCancelRideRequest}
          containerStyle={{
            minHeight: 250,
            width: screenWidth * 0.9,
            padding: 20,
            justifyContent: 'center',
            alignSelf: 'center'
          }}
        />
      </AnimatedCard>
    </View>
  );
};

export default RideProcessCard;

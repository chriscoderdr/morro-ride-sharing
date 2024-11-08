import ConfirmRideLocation from '@/src/components/confirm-ride-location';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';

const ConfirmRide = () => {
  return (
    <PermissionBlocker>
      <ConfirmRideLocation />
    </PermissionBlocker>
  );
};

export default ConfirmRide;

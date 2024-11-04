import MapView from '@/src/components/map-view';
import PermissionBlocker from '@/src/components/permission-blocker';
import RideRequestDashboard from '@/src/components/ride-request-dashboard';
import StatusCard from '@/src/components/status-card';
import useBackgroundLocation from '@/src/hooks/use-background-location';
import useForegroundLocation from '@/src/hooks/use-foreground-location';
import { View } from 'react-native';

export default function Map() {
  useBackgroundLocation(); // TODO: Implement useBackgroundLocation hook
  useForegroundLocation();

  return (
    <View style={{ flex: 1 }}>
      <PermissionBlocker>
        <StatusCard />
        <MapView />
        <RideRequestDashboard />
      </PermissionBlocker>
    </View>
  );
}

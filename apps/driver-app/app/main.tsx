import MapView from '@/src/components/map-view';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';
import RideRequestDashboard from '@/src/components/ride-request-dashboard';
import StatusCard from '@/src/components/status-card';
import useForegroundLocation from '@/src/hooks/use-foreground-location';

export default function Map() {
  useForegroundLocation();

  return (
    <PermissionBlocker
      title="Permissions Required"
      subtitle="To receive ride requests and navigate to passengers, we need access to notifications, location, and background location. Please enable these permissions in your settings to start accepting rides."
      alertTitle="Permissions Required"
      alertSubtitle="We need location, background location, and notification permissions to provide ride services."
      requireLocation
      requireNotification
      requireBackgroundLocation
    >
      <StatusCard />
      <MapView />
      <RideRequestDashboard />
    </PermissionBlocker>
  );
}

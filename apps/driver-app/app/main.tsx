import MapView from '@/src/components/map-view';
import RideRequestDashboard from '@/src/components/ride-request-dashboard';
import useForegroundLocation from '@/src/hooks/use-foreground-location';
import useNotificationPermissions from '@/src/hooks/use-notifications-permissions';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Map() {
  // useBackgroundLocation(); // TODO: Implement useBackgroundLocation hook
  useForegroundLocation();

  const notification = useNotificationPermissions();

  useEffect(() => {
    notification.requestPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView />
      <RideRequestDashboard />
    </View>
  );
}

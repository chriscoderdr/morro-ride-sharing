import ConfirmRideLocation from '@/src/components/confirm-ride-location';
import { PlanRide } from '@/src/components/plan-ride';
import { SearchBox } from '@/src/components/search-box';
import Mapbox, { MapView } from '@rnmapbox/maps';
import { View } from 'react-native';
import {
  InputPhone,
  KeyboardDismiss,
  PermissionBlocker
} from 'react-native-morro-taxi-rn-components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PermissionBlocker>
          <KeyboardDismiss>
            <PlanRide />
          </KeyboardDismiss>
        </PermissionBlocker>
      </View>
    </SafeAreaView>
  );
}

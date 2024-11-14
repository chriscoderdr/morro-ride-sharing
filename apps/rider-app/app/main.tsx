import { PlanRide } from '@/src/components/plan-ride';
import Mapbox from '@rnmapbox/maps';
import { View } from 'react-native';
import {
  KeyboardDismiss,
  MapView
} from 'react-native-morro-taxi-rn-components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <MapView />

      <PlanRide />
    </View>
  );
}

import { PlanRide } from '@/src/components/plan-ride';
import { View } from 'react-native';
import { MapView } from 'react-native-morro-taxi-rn-components';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <MapView />

      <PlanRide />
    </View>
  );
}

import { PlanRide } from '@/src/components/plan-ride';
import { View } from 'react-native';
import {
  KeyboardDismiss
} from 'react-native-morro-taxi-rn-components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <KeyboardDismiss>
          <PlanRide />
        </KeyboardDismiss>
      </View>
    </SafeAreaView>
  );
}

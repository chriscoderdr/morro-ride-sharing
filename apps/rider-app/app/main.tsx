import Mapbox, { MapView } from '@rnmapbox/maps';
import { View } from 'react-native';
import {
  InputPhone,
  PermissionBlocker
} from 'react-native-morro-taxi-rn-components';

export default function Home() {
  //   // useBackgroundLocation(); // TODO: Implement useBackgroundLocation hook
  //   useForegroundLocation();

  return (
    <View style={{ flex: 1 }}>
      <PermissionBlocker>
        <Mapbox.MapView style={{ flex: 1 }}></Mapbox.MapView>
      </PermissionBlocker>
    </View>
  );
}

import { MapView } from '@rnmapbox/maps';
import { View } from 'react-native';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';

export default function Home() {
  //   // useBackgroundLocation(); // TODO: Implement useBackgroundLocation hook
  //   useForegroundLocation();

  return (
    <View style={{ flex: 1 }}>
      {/* <PermissionBlocker> */}
        <MapView />
      {/* </PermissionBlocker> */}
    </View>
  );
}

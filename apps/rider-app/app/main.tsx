import { SearchBox } from '@/src/components/search-box';
import Mapbox, { MapView } from '@rnmapbox/maps';
import { View } from 'react-native';
import {
  InputPhone,
  PermissionBlocker
} from 'react-native-morro-taxi-rn-components';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PermissionBlocker>
        <View style={{ flex: 1 }}>
          <SearchBox  />
        </View>
        {/* <Mapbox.MapView style={{ flex: 1 }}></Mapbox.MapView> */}
      </PermissionBlocker>
    </View>
  );
}

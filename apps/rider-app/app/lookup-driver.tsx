import React from 'react';

import { View } from 'react-native';
import { PermissionBlocker } from 'react-native-morro-taxi-rn-components';
import RideProcess from '@/src/components/ride-process';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <PermissionBlocker>
        <RideProcess />
      </PermissionBlocker>
    </View>
  );
}

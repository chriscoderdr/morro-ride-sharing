import { RootState } from '@/src/store';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const StatusCard = () => {
  const { isConnected, isEnabled, isConnecting } = useSelector(
    (state: RootState) => state.mqtt
  );

  const statusMessage = isEnabled
    ? isConnected
      ? 'Connected: Ready to Accept Rides'
      : isConnecting
      ? 'Connecting...'
      : 'Disconnected: Unable to Accept Rides'
    : 'MQTT Disabled';

  const statusColor = isEnabled
    ? isConnected
      ? '#4CAF50' // Green for connected
      : '#F44336' // Red for disconnected
    : '#FFC107'; // Yellow for disabled

  return (
    <View style={[styles.card, { backgroundColor: statusColor }]}>
      <Text style={styles.statusText}>{statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    marginTop: 100,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    width: '90%',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusCard;

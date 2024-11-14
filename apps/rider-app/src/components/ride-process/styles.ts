import { StyleSheet, ViewStyle } from 'react-native';

interface IRIdeProcessStyles {
  container: ViewStyle;
  myLocationButton: ViewStyle;
  dashboardContainer: ViewStyle;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myLocationButton: {
    bottom: 300
  },
  dashboardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20
  }
});

import { StyleSheet, ViewStyle } from 'react-native';

interface IPlanRideStyles {
  container: ViewStyle;
  separator: ViewStyle;
  listContainers: ViewStyle;
  planRideContainer: ViewStyle;
}

export const styles = StyleSheet.create<IPlanRideStyles>({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  separator: {
    marginVertical: 15
  },
  listContainers: {
    marginTop: 8
  },
  planRideContainer: {
    marginTop: 8
  }
});

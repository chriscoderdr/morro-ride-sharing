import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface RideRequestCardStyles {
  container: ViewStyle;
  priceText: TextStyle;
  infoContainer: ViewStyle;
  infoText: TextStyle;
  locationText: TextStyle;
}

export default RideRequestCardStyles;

export const styles = StyleSheet.create<RideRequestCardStyles>({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  infoContainer: {
    marginVertical: 5
  },
  infoText: {
    fontSize: 16,
    color: '#666'
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
});

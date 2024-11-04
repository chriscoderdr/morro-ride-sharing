import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface TripCompleteCardStyles {
  riderInfoContainer: ViewStyle;
  icon: ViewStyle;
  riderNameText: TextStyle;
  destinationInfoContainer: ViewStyle;
  infoText: TextStyle;
  locationText: TextStyle;
}

export default TripCompleteCardStyles;

export const styles = StyleSheet.create<TripCompleteCardStyles>({
  riderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  icon: {
    marginRight: 10
  },
  riderNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  destinationInfoContainer: {
    marginVertical: 10
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

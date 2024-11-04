import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface TripStartCardStyles {
  riderInfoContainer: ViewStyle;
  riderDetails: ViewStyle;
  riderName: TextStyle;
  callButton: ViewStyle;
  callButtonText: TextStyle;
  riderIcon: ImageStyle;
}

export default TripStartCardStyles;

export const styles = StyleSheet.create<TripStartCardStyles>({
  riderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  riderDetails: {
    flex: 1,
    marginRight: 10
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  callButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 5
  },
  riderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd'
  }
});

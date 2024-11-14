import { StyleSheet, ViewStyle } from 'react-native';

interface IConfirmRideStyles {
  container: ViewStyle;
  locationButton: ViewStyle;
  cardsContainer: ViewStyle;
}

export const styles = StyleSheet.create<IConfirmRideStyles>({
  container: {
    flex: 1
  },
  locationButton: {
    bottom: 300
  },
  cardsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20
  }
});

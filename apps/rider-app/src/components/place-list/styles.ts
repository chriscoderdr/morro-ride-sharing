import { StyleSheet, ViewStyle } from 'react-native';

interface IPlaceListStyles {
  separator: ViewStyle;
}

export const styles = StyleSheet.create<IPlaceListStyles>({
  separator: {
    height: 1,
    backgroundColor: '#000000'
  }
});

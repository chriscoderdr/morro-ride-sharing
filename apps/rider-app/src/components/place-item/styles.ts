import { StyleSheet, ViewStyle } from 'react-native';

interface IPlaceItemStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<IPlaceItemStyles>({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 8
  }
});

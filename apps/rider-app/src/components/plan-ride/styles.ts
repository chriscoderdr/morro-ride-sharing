import { StyleSheet, ViewStyle } from 'react-native';

interface IPlanRideStyles {
  container: ViewStyle;
  separator: ViewStyle;
  listContainers: ViewStyle;
  planRideContainer: ViewStyle;
}

export const styles = StyleSheet.create<IPlanRideStyles>({
  container: {
    flex: 1,
    paddingHorizontal: 20
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

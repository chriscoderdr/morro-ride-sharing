import { StyleSheet, ViewStyle } from 'react-native';

interface IMapViewStyles {
  button: ViewStyle;
}

const styles: IMapViewStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default styles;

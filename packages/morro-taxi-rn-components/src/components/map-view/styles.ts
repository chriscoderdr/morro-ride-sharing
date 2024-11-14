import { StyleSheet, ViewStyle } from 'react-native';

interface IMapViewStyles {
  button: ViewStyle;
  navigateButton: ViewStyle;
  iconContainer: ViewStyle;
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
  },
  iconContainer: {
    borderColor: '#FFFFFF',
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigateButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;

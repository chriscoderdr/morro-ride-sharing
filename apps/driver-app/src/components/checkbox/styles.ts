import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ICheckboxStyles {
  container: ViewStyle;
  checkbox: ViewStyle;
  label: TextStyle;
}

export const styles = StyleSheet.create<ICheckboxStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginLeft: 12,
    textDecorationLine: 'underline'
  }
});

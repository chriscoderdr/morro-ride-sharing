import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface IInputTextFieldStyles {
  container: ViewStyle;
  label: TextStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<IInputTextFieldStyles>({
  container: {
    marginBottom: 10
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 14 * 1.25,
    color: '#000000',
    marginBottom: 6
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 16 * 1.25,
    color: '#F54135',
    marginTop: 6,
    textAlign: 'left'
  }
});

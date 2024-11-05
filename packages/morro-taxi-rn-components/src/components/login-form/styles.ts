import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ILoginFormStyles {
  container: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  buttonContainer: ViewStyle;
  feedbackContainer: ViewStyle;
  feedbackSuccess: TextStyle;
  feedbackError: TextStyle;
  dontHaveAnAccount: ViewStyle;
  dontHaveAnAccountText: TextStyle;
}

export const styles = StyleSheet.create<ILoginFormStyles>({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    lineHeight: 30 * 1.3,
    color: '#000000',
    marginBottom: 14,
    textAlign: 'center'
  },
  inputContainer: {
    gap: 22
  },
  buttonContainer: {
    marginTop: 14
  },
  feedbackContainer: {
    minHeight: 34
  },
  feedbackSuccess: {
    color: 'green',
    marginVertical: 8
  },
  feedbackError: {
    color: 'red',
    marginVertical: 8
  },
  dontHaveAnAccount: {
    marginVertical: 16,
    alignItems: 'center'
  },
  dontHaveAnAccountText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14
  }
});

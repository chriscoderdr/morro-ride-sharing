import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ISignUpFormStyles {
  container: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  checkboxContainer: ViewStyle;
  buttonContainer: ViewStyle;
  feedbackContainer: ViewStyle;
  feedbackSuccess: TextStyle;
  feedbackError: TextStyle;
  alreadyHaveAnAccount: ViewStyle;
  alredayHaveAnAccountText: TextStyle;
}

export const styles = StyleSheet.create<ISignUpFormStyles>({
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
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 8
  },

  buttonContainer: {
    marginTop: 14
  },
  feedbackContainer: {
    // minHeight: 34
  },
  feedbackSuccess: {
    color: 'green',
    marginVertical: 8
  },
  feedbackError: {
    color: 'red',
    marginVertical: 8
  },
  alreadyHaveAnAccount: {
    marginVertical: 16,
    alignItems: 'center'
  },
  alredayHaveAnAccountText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#000000'
  }
});

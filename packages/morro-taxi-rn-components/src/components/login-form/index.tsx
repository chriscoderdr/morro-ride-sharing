import InputTextField from '../input-text-field';
import RoundedButton from '../rounded-button';

import { isValidEmail, isValidPassword } from '../../utils/validators';

import React, { useState } from 'react';
import { Alert, Keyboard, Text, View } from 'react-native';
import { styles } from './styles';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );

  const handleLogin = async () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(undefined);
    }

    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError(undefined);
    }

    if (isValid) {
      try {
        // Todo: Implement login functionality
      } catch (err: any) {
        const errorMessage =
          err?.data?.error || 'Login failed. Please try again.';
        Alert.alert('Login Error', errorMessage);
      }
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(
      !isValidEmail(text) ? 'Please enter a valid email address' : undefined
    );
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(
      text.length < 8 ? 'Password must be at least 8 characters' : undefined
    );
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const isButtonDisabled = () => {
    return Boolean(emailError || passwordError) || !email || !password;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <InputTextField
          label="Email"
          placeholder="example@gmail.com"
          fullWidth
          autoComplete="email"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={handleEmailChange}
          errorText={emailError}
          testID="email-input"
          errorTestId="email-input-error"
        />
        <InputTextField
          label="Password"
          placeholder="Enter your password"
          fullWidth
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={handleSubmitEditing}
          securedEntry
          onChangeText={handlePasswordChange}
          errorText={passwordError}
          testID="password-input"
          errorTestId="password-input-error"
        />
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton
          disabled={isButtonDisabled()}
          // text={isLoading ? 'Logging in...' : 'Login'}
          text="Login"
          onPress={handleLogin}
          testID="login-button"
        />
        <View style={styles.dontHaveAnAccount}>
          {/* <Link href="/signup" style={styles.dontHaveAnAccountText}> */}
          <Text>Don't have an account? Sign up</Text>
          {/* </Link> */}
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

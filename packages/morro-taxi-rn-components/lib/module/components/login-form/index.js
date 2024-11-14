"use strict";

import InputTextField from "../input-text-field/index.js";
import RoundedButton from "../rounded-button/index.js";
import { isValidEmail, isValidPassword } from "../../utils/validators/index.js";
import { useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LoginForm = ({
  loginUser,
  isLoading,
  onGoToRegister
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
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
        await loginUser({
          email,
          password
        });
      } catch (err) {
        const errorMessage = err?.data?.error || 'Login failed. Please try again.';
        Alert.alert('Login Error', errorMessage);
      }
    }
  };
  const handleEmailChange = text => {
    setEmail(text);
    setEmailError(!isValidEmail(text) ? 'Please enter a valid email address' : undefined);
  };
  const handlePasswordChange = text => {
    setPassword(text);
    setPasswordError(text.length < 8 ? 'Password must be at least 8 characters' : undefined);
  };
  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };
  const isButtonDisabled = () => {
    return isLoading || Boolean(emailError || passwordError) || !email || !password;
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(Text, {
      style: styles.title,
      children: "Login"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.inputContainer,
      children: [/*#__PURE__*/_jsx(InputTextField, {
        label: "Email",
        placeholder: "example@gmail.com",
        fullWidth: true,
        autoComplete: "email",
        autoCorrect: false,
        autoCapitalize: "none",
        onChangeText: handleEmailChange,
        errorText: emailError,
        testID: "email-input",
        errorTestId: "email-input-error"
      }), /*#__PURE__*/_jsx(InputTextField, {
        label: "Password",
        placeholder: "Enter your password",
        fullWidth: true,
        autoCorrect: false,
        autoCapitalize: "none",
        onSubmitEditing: handleSubmitEditing,
        securedEntry: true,
        onChangeText: handlePasswordChange,
        errorText: passwordError,
        testID: "password-input",
        errorTestId: "password-input-error"
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.buttonContainer,
      children: [/*#__PURE__*/_jsx(RoundedButton, {
        disabled: isButtonDisabled(),
        text: isLoading ? 'Logging in...' : 'Login',
        onPress: handleLogin,
        testID: "login-button"
      }), /*#__PURE__*/_jsx(View, {
        style: styles.dontHaveAnAccount,
        children: onGoToRegister && /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: onGoToRegister,
          children: /*#__PURE__*/_jsx(View, {
            style: styles.dontHaveAnAccountText,
            children: /*#__PURE__*/_jsx(Text, {
              children: "Don't have an account? Sign up"
            })
          })
        })
      })]
    })]
  });
};
export default LoginForm;
//# sourceMappingURL=index.js.map
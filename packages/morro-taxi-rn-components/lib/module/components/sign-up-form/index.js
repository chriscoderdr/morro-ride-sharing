"use strict";

import { useRef, useState } from 'react';
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { isValidEmail, isValidName, isValidPassword, isValidPhone } from "../../utils/validators/index.js";
import InputTextField from "..//input-text-field/index.js";
import Checkbox from "../checkbox/index.js";
import RoundedButton from "../rounded-button/index.js";
import { styles } from "./styles.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SignUpForm = ({
  registerUser,
  isLoading,
  onGoToLogin
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [phoneError, setPhoneError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState(undefined);
  const phoneInputRef = useRef(null);
  const handleSignUp = async () => {
    let isValid = true;
    if (!isValidName(name)) {
      setNameError('Please enter a valid name');
      isValid = false;
    } else {
      setNameError(undefined);
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(undefined);
    }
    if (!isValidPhone(phone, phoneInputRef)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError(undefined);
    }
    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError(undefined);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError(undefined);
    }
    if (isValid && isChecked) {
      try {
        registerUser({
          name,
          email,
          phone,
          password
        });
      } catch (err) {
        const errorMessage = err?.data?.error || 'Registration failed. Please try again.';
        Alert.alert('Sign up Error', errorMessage);
      }
    }
  };
  const handleNameChange = text => {
    setName(text);
    setNameError(!isValidName(text) ? 'Please enter a valid name' : undefined);
  };
  const handleEmailChange = text => {
    setEmail(text);
    setEmailError(!isValidEmail(text) ? 'Please enter a valid email address' : undefined);
  };
  const handlePhoneChange = text => {
    setPhone(text);
    setPhoneError(!isValidPhone(text, phoneInputRef) ? 'Please enter a valid phone number' : undefined);
  };
  const handlePasswordChange = text => {
    setPassword(text);
    setPasswordError(text.length < 8 ? 'Password must be at least 8 characters' : undefined);
    setConfirmPasswordError(confirmPassword && text !== confirmPassword ? 'Passwords do not match' : undefined);
  };
  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    setConfirmPasswordError(text !== password ? 'Passwords do not match' : undefined);
  };
  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };
  const isButtonDisabled = () => {
    return isLoading || !isChecked || Boolean(nameError || emailError || phoneError || passwordError || confirmPasswordError) || !name || !email || !phone || !password || !confirmPassword;
  };
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(Text, {
      style: styles.title,
      children: "Sign Up"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.inputContainer,
      children: [/*#__PURE__*/_jsx(InputTextField, {
        label: "Name",
        placeholder: "John Doe",
        fullWidth: true,
        autoCorrect: false,
        onChangeText: handleNameChange,
        errorText: nameError,
        testID: "name-input",
        errorTestId: "name-input-error"
      }), /*#__PURE__*/_jsx(InputTextField, {
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
        label: "Phone",
        placeholder: "809-220-1111",
        fullWidth: true,
        phoneEntry: true,
        onChangeText: handlePhoneChange,
        errorText: phoneError,
        testID: "phone-input",
        errorTestId: "phone-input-error",
        ref: phoneInputRef
      }), /*#__PURE__*/_jsx(InputTextField, {
        label: "Create a password",
        placeholder: "must be 8 characters",
        fullWidth: true,
        textContentType: "oneTimeCode",
        inputMode: "text",
        autoCorrect: false,
        blurOnSubmit: false,
        autoCapitalize: "none",
        onSubmitEditing: handleSubmitEditing,
        securedEntry: true,
        onChangeText: handlePasswordChange,
        errorText: passwordError,
        testID: "password-input",
        errorTestId: "password-input-error"
      }), /*#__PURE__*/_jsx(InputTextField, {
        label: "Confirm Password",
        placeholder: "repeat password",
        fullWidth: true,
        autoComplete: "new-password",
        blurOnSubmit: false,
        onSubmitEditing: handleSubmitEditing,
        autoCorrect: false,
        autoCapitalize: "none",
        errorText: confirmPasswordError,
        securedEntry: true,
        onChangeText: handleConfirmPasswordChange,
        testID: "confirm-password-input",
        errorTestId: "confirm-password-input-error"
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.checkboxContainer,
      children: /*#__PURE__*/_jsx(Checkbox, {
        checked: isChecked,
        onChange: checked => setIsChecked(checked),
        label: "I accept the terms and privacy policy",
        linkUrl: "https://example.com/terms",
        testID: "terms-checkbox"
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.buttonContainer,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.alreadyHaveAnAccount,
        children: onGoToLogin && /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: onGoToLogin,
          children: /*#__PURE__*/_jsx(View, {
            style: styles.alredayHaveAnAccountText,
            children: /*#__PURE__*/_jsx(Text, {
              children: "Alreday have an account? Sign in"
            })
          })
        })
      }), /*#__PURE__*/_jsx(RoundedButton, {
        disabled: isButtonDisabled(),
        text: isLoading ? 'Signing Up...' : 'Sign Up',
        onPress: handleSignUp,
        testID: "signup-button"
      })]
    })]
  });
};
export default SignUpForm;
//# sourceMappingURL=index.js.map
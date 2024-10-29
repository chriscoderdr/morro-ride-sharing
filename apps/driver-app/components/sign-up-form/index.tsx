import React, { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import Checkbox from "../checkbox";
import InputTextField from "../input-text-field";
import RoundedButton from "../rounded-button";
import { styles } from "./styles";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(undefined);
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError(undefined);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError(undefined);
    }

    if (isValid) {
      console.log("Sign Up:", { email, password, confirmPassword });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!isValidEmail(text)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(undefined);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError(undefined);
    }
    if (confirmPassword && text !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else if (confirmPassword) {
      setConfirmPasswordError(undefined);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(undefined);
    }
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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
          label="Create a password"
          placeholder="must be 8 characters"
          fullWidth
          textContentType="oneTimeCode"
          inputMode="text"
          autoCorrect={false}
          blurOnSubmit={false}
          autoCapitalize="none"
          onSubmitEditing={handleSubmitEditing}
          securedEntry
          onChangeText={handlePasswordChange}
          errorText={passwordError}
          testID="password-input"
          errorTestId="password-input-error"
        />

        <InputTextField
          label="Confirm Password"
          placeholder="repeat password"
          fullWidth
          autoComplete="new-password"
          blurOnSubmit={false}
          onSubmitEditing={handleSubmitEditing}
          autoCorrect={false}
          autoCapitalize="none"
          errorText={confirmPasswordError}
          securedEntry
          onChangeText={handleConfirmPasswordChange}
          testID="confirm-password-input"
          errorTestId="confirm-password-input-error"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          checked={isChecked}
          onChange={(checked) => setIsChecked(checked)}
          label="I accept the terms and privacy policy"
          linkUrl="https://raw.githubusercontent.com/ArthurGareginyan/privacy-policy-template/refs/heads/master/privacy-policy.txt"
        />
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton
          text="Sign Up"
          onPress={handleSignUp}
          testID="signup-button"
        />
      </View>
    </View>
  );
};

export default SignUpForm;

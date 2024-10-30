import React, { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { useRegisterDriver } from "../../hooks/api/use-register-driver";
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
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const { mutate, status, isError, error, isSuccess } = useRegisterDriver();

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

    if (isValid && isChecked) {
      mutate({ email, password });
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(!isValidEmail(text) ? "Please enter a valid email address" : undefined);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(text.length < 8 ? "Password must be at least 8 characters" : undefined);
    setConfirmPasswordError(confirmPassword && text !== confirmPassword ? "Passwords do not match" : undefined);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text !== password ? "Passwords do not match" : undefined);
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
          linkUrl="https://example.com/terms"
        />
      </View>

      <View style={styles.buttonContainer}>
        <RoundedButton
          text={status === 'loading' ? "Signing Up..." : "Sign Up"}
          onPress={handleSignUp}
          testID="signup-button"
        />
        {isError && <Text style={{ color: 'red' }}>{(error as Error).message}</Text>}
        {isSuccess && <Text style={{ color: 'green' }}>Registration successful!</Text>}
      </View>
    </View>
  );
};

export default SignUpForm;

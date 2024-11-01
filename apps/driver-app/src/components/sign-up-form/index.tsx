import Checkbox from "@/src/components/checkbox";
import InputTextField from "@/src/components/input-text-field";
import RoundedButton from "@/src/components/rounded-button";
import { useAppDispatch } from "@/src/hooks/use-app-dispatch";
import { useRegisterDriverMutation } from "@/src/store/slices/api-slice";
import { setTokens } from "@/src/store/slices/auth-slice";
import React, { useRef, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { styles } from "./styles";

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const phoneInputRef = useRef<PhoneInput>(null);
  const dispatch = useAppDispatch();

  const [registerDriver, { isLoading, isError, error, isSuccess }] = useRegisterDriverMutation();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidName = (name: string) => name.trim().length >= 2;
  const isValidPhone = (phone: string) => phoneInputRef.current?.isValidNumber(phone);

  const handleSignUp = async () => {
    let isValid = true;

    if (!isValidName(name)) {
      setNameError("Please enter a valid name");
      isValid = false;
    } else {
      setNameError(undefined);
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(undefined);
    }

    if (!isValidPhone(phone)) {
      setPhoneError("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneError(undefined);
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
      setRegistrationError(null);
      try {
        const result = await registerDriver({ name, email, phone, password }).unwrap();
        console.log(`Registration successful: ${result.driverId}`);
        dispatch(setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken }));
      } catch (err: any) {
        const errorMessage = err?.data?.error || "Registration failed. Please try again.";
        setRegistrationError(errorMessage);
        console.error("Registration failed:", errorMessage);
      }
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setNameError(!isValidName(text) ? "Please enter a valid name" : undefined);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(
      !isValidEmail(text) ? "Please enter a valid email address" : undefined
    );
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    setPhoneError(
      !isValidPhone(text) ? "Please enter a valid phone number" : undefined
    );
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(
      text.length < 8 ? "Password must be at least 8 characters" : undefined
    );
    setConfirmPasswordError(
      confirmPassword && text !== confirmPassword
        ? "Passwords do not match"
        : undefined
    );
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(
      text !== password ? "Passwords do not match" : undefined
    );
  };

  const handleSubmitEditing = () => {
    Keyboard.dismiss();
  };

  const isButtonDisabled = () => {
    return (
      isLoading ||
      !isChecked ||
      Boolean(
        nameError ||
          emailError ||
          phoneError ||
          passwordError ||
          confirmPasswordError
      ) ||
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <InputTextField
          label="Name"
          placeholder="John Doe"
          fullWidth
          autoCorrect={false}
          onChangeText={handleNameChange}
          errorText={nameError}
          testID="name-input"
          errorTestId="name-input-error"
        />
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
          label="Phone"
          placeholder="809-220-1111"
          fullWidth
          phoneEntry
          onChangeText={handlePhoneChange}
          errorText={phoneError}
          testID="phone-input"
          errorTestId="phone-input-error"
          ref={phoneInputRef}
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
          testID="terms-checkbox"
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.feedbackContainer}>
          {registrationError && (
            <Text style={styles.feedbackError}>{registrationError}</Text>
          )}
          {isSuccess && (
            <Text style={styles.feedbackSuccess}>Registration successful!</Text>
          )}
        </View>
        <RoundedButton
          disabled={isButtonDisabled()}
          text={isLoading ? "Signing Up..." : "Sign Up"}
          onPress={handleSignUp}
          testID="signup-button"
        />
      </View>
    </View>
  );
};

export default SignUpForm;

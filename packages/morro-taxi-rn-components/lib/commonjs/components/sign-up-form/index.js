"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../utils/validators/index.js");
var _index2 = _interopRequireDefault(require("..//input-text-field/index.js"));
var _index3 = _interopRequireDefault(require("../checkbox/index.js"));
var _index4 = _interopRequireDefault(require("../rounded-button/index.js"));
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SignUpForm = ({
  registerUser,
  isLoading,
  onGoToLogin
}) => {
  const [name, setName] = (0, _react.useState)('');
  const [email, setEmail] = (0, _react.useState)('');
  const [phone, setPhone] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [confirmPassword, setConfirmPassword] = (0, _react.useState)('');
  const [isChecked, setIsChecked] = (0, _react.useState)(false);
  const [nameError, setNameError] = (0, _react.useState)(undefined);
  const [emailError, setEmailError] = (0, _react.useState)(undefined);
  const [phoneError, setPhoneError] = (0, _react.useState)(undefined);
  const [passwordError, setPasswordError] = (0, _react.useState)(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = (0, _react.useState)(undefined);
  const phoneInputRef = (0, _react.useRef)(null);
  const handleSignUp = async () => {
    let isValid = true;
    if (!(0, _index.isValidName)(name)) {
      setNameError('Please enter a valid name');
      isValid = false;
    } else {
      setNameError(undefined);
    }
    if (!(0, _index.isValidEmail)(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(undefined);
    }
    if (!(0, _index.isValidPhone)(phone, phoneInputRef)) {
      setPhoneError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneError(undefined);
    }
    if (!(0, _index.isValidPassword)(password)) {
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
        _reactNative.Alert.alert('Sign up Error', errorMessage);
      }
    }
  };
  const handleNameChange = text => {
    setName(text);
    setNameError(!(0, _index.isValidName)(text) ? 'Please enter a valid name' : undefined);
  };
  const handleEmailChange = text => {
    setEmail(text);
    setEmailError(!(0, _index.isValidEmail)(text) ? 'Please enter a valid email address' : undefined);
  };
  const handlePhoneChange = text => {
    setPhone(text);
    setPhoneError(!(0, _index.isValidPhone)(text, phoneInputRef) ? 'Please enter a valid phone number' : undefined);
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
    _reactNative.Keyboard.dismiss();
  };
  const isButtonDisabled = () => {
    return isLoading || !isChecked || Boolean(nameError || emailError || phoneError || passwordError || confirmPasswordError) || !name || !email || !phone || !password || !confirmPassword;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _styles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.title,
      children: "Sign Up"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _styles.styles.inputContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
        label: "Name",
        placeholder: "John Doe",
        fullWidth: true,
        autoCorrect: false,
        onChangeText: handleNameChange,
        errorText: nameError,
        testID: "name-input",
        errorTestId: "name-input-error"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
        label: "Phone",
        placeholder: "809-220-1111",
        fullWidth: true,
        phoneEntry: true,
        onChangeText: handlePhoneChange,
        errorText: phoneError,
        testID: "phone-input",
        errorTestId: "phone-input-error",
        ref: phoneInputRef
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _styles.styles.checkboxContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
        checked: isChecked,
        onChange: checked => setIsChecked(checked),
        label: "I accept the terms and privacy policy",
        linkUrl: "https://example.com/terms",
        testID: "terms-checkbox"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _styles.styles.buttonContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.styles.alreadyHaveAnAccount,
        children: onGoToLogin && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: onGoToLogin,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _styles.styles.alredayHaveAnAccountText,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: "Alreday have an account? Sign in"
            })
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.default, {
        disabled: isButtonDisabled(),
        text: isLoading ? 'Signing Up...' : 'Sign Up',
        onPress: handleSignUp,
        testID: "signup-button"
      })]
    })]
  });
};
var _default = exports.default = SignUpForm;
//# sourceMappingURL=index.js.map
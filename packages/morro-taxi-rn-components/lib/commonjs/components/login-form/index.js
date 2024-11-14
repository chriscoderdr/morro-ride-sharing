"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../input-text-field/index.js"));
var _index2 = _interopRequireDefault(require("../rounded-button/index.js"));
var _index3 = require("../../utils/validators/index.js");
var _react = require("react");
var _reactNative = require("react-native");
var _styles = require("./styles.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LoginForm = ({
  loginUser,
  isLoading,
  onGoToRegister
}) => {
  const [email, setEmail] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [emailError, setEmailError] = (0, _react.useState)(undefined);
  const [passwordError, setPasswordError] = (0, _react.useState)(undefined);
  const handleLogin = async () => {
    let isValid = true;
    if (!(0, _index3.isValidEmail)(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(undefined);
    }
    if (!(0, _index3.isValidPassword)(password)) {
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
        _reactNative.Alert.alert('Login Error', errorMessage);
      }
    }
  };
  const handleEmailChange = text => {
    setEmail(text);
    setEmailError(!(0, _index3.isValidEmail)(text) ? 'Please enter a valid email address' : undefined);
  };
  const handlePasswordChange = text => {
    setPassword(text);
    setPasswordError(text.length < 8 ? 'Password must be at least 8 characters' : undefined);
  };
  const handleSubmitEditing = () => {
    _reactNative.Keyboard.dismiss();
  };
  const isButtonDisabled = () => {
    return isLoading || Boolean(emailError || passwordError) || !email || !password;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: _styles.styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: _styles.styles.title,
      children: "Login"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _styles.styles.inputContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
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
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _styles.styles.buttonContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
        disabled: isButtonDisabled(),
        text: isLoading ? 'Logging in...' : 'Login',
        onPress: handleLogin,
        testID: "login-button"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: _styles.styles.dontHaveAnAccount,
        children: onGoToRegister && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: onGoToRegister,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: _styles.styles.dontHaveAnAccountText,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              children: "Don't have an account? Sign up"
            })
          })
        })
      })]
    })]
  });
};
var _default = exports.default = LoginForm;
//# sourceMappingURL=index.js.map
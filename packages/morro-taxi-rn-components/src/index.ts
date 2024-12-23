import Checkbox from './components/checkbox';
import GenericCard from './components/generic-card';
import InputPhone from './components/input-phone';
import InputText from './components/input-text';
import InputTextField from './components/input-text-field';
import KeyboardDismiss from './components/keyboard-dismiss';
import LoginForm from './components/login-form';
import ObscuredInputText from './components/obscured-input-text';
import PermissionBlocker from './components/permission-blocker';
import RoundedButton from './components/rounded-button';
import ScrollableFormContainer from './components/scrollable-form-container';
import SignUpForm from './components/sign-up-form';
import TestComponent from './components/test-component';
import MapView from './components/map-view';
import MapService from './services/map-service';
import utils from './utils';
import AnimatedCard from './components/animated-card';

export {
  Checkbox,
  GenericCard,
  InputPhone,
  InputText,
  InputTextField,
  KeyboardDismiss,
  LoginForm,
  ObscuredInputText,
  PermissionBlocker,
  RoundedButton,
  ScrollableFormContainer,
  SignUpForm,
  TestComponent,
  MapView,
  MapService,
  utils,
  AnimatedCard,
};

export type { ICheckboxProps } from './components/checkbox/props';
export type { IGenericCardProps } from './components/generic-card/props';
export type { IInputPhoneProps } from './components/input-phone/props';
export type { IInputTextFieldProps } from './components/input-text-field/props';
export type { IInputTextProps } from './components/input-text/props';
export type { IButtonProps } from './components/rounded-button/props';
export type {
  IRegisterUser,
  ISignUpFormProps,
} from './components/sign-up-form/props';
export type {
  ILoginUser,
  ILoginFormProps,
} from './components/login-form/props';
export type { AnimatedCardProps } from './components/animated-card/props';

// export { default as MorroTaxiRnComponentsView } from './MorroTaxiRnComponentsViewNativeComponent';
// export * from './MorroTaxiRnComponentsViewNativeComponent';

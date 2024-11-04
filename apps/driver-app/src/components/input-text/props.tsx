import { TextInputProps } from 'react-native';

export interface IInputTextProps extends TextInputProps {
  IconComponent?: React.ReactNode;
  onIconPress?: () => void;
  fullWidth?: boolean;
}

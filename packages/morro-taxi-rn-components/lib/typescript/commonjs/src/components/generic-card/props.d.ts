/// <reference types="react" />
import { TextStyle, ViewStyle } from 'react-native';
export interface IGenericCardProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    buttonText?: string;
    onPressButton?: () => void;
    buttonType?: 'primary' | 'secondary';
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: TextStyle;
    secondaryButtonText?: string;
    onPressSecondaryButton?: () => void;
    secondaryButtonType?: 'primary' | 'secondary';
    secondaryButtonStyle?: ViewStyle;
    secondaryButtonTextStyle?: TextStyle;
}
//# sourceMappingURL=props.d.ts.map
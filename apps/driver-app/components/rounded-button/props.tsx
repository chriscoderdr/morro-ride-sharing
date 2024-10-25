interface IButtonProps {
    text: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    borderRadius?: number;
    type?: 'primary' | 'secondary';
  }
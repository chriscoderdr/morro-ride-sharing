import { ViewStyle } from "react-native";

export interface AnimatedCardProps {
  children: React.ReactNode;
  isExiting?: boolean;
  onExitComplete?: () => void;
  style?: ViewStyle;
}
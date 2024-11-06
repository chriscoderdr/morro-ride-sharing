import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IGenericCardProps } from './props';
import { styles } from './styles';

const GenericCard: React.FC<IGenericCardProps> = ({
  title,
  subtitle,
  children,
  buttonText,
  onPressButton,
  buttonType = 'primary', // Default to 'primary'
  containerStyle,
  buttonStyle,
  buttonTextStyle
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
      {buttonText && onPressButton && (
        <TouchableOpacity
          style={[
            styles.button,
            buttonType === 'primary'
              ? styles.primaryButton
              : styles.secondaryButton,
            buttonStyle
          ]}
          onPress={onPressButton}
        >
          <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GenericCard;

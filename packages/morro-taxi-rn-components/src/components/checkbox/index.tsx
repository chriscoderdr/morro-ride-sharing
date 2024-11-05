import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './styles';

const Checkbox: React.FC<ICheckboxProps> = ({
  checked = false,
  onChange,
  label,
  linkUrl,
  testID
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  const handleLabelPress = () => {
    if (linkUrl) {
      Linking.openURL(linkUrl).catch((err) =>
        console.error('Failed to open URL:', err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleCheckboxPress}
        style={styles.checkbox}
        testID={testID}
      >
        {isChecked && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
      </TouchableOpacity>
      {label && (
        <TouchableOpacity onPress={handleLabelPress}>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Checkbox;

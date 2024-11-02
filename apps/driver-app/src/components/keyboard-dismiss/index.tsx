import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

const KeyboardDismiss: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismiss;

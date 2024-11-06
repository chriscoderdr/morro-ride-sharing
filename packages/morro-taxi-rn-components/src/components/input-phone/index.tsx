import { forwardRef } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { IInputPhoneProps } from './props';
import { styles } from './styles';

const InputPhone = forwardRef<PhoneInput, IInputPhoneProps>(
  ({ defaultCode = 'US' as any, onChangeText, testID, defaultValue }, ref) => {
    return (
      <View style={styles.container}>
        <PhoneInput
          ref={ref}
          defaultValue={defaultValue}
          defaultCode={defaultCode}
          layout="first"
          onChangeFormattedText={(text) => {
            onChangeText && onChangeText(text);
          }}
          placeholder="809-220-1111"
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.textContainer}
          countryPickerButtonStyle={styles.countryPickerButton}
          codeTextStyle={styles.codeText}
          textInputStyle={styles.textInput}
          textInputProps={{
            placeholderTextColor: 'rgba(0, 0, 0, 0.5)',
            testID: testID
          }}
          countryPickerProps={{
            withAlphaFilter: true,
            withCallingCode: true
          }}
        />
      </View>
    );
  }
);

export default InputPhone;

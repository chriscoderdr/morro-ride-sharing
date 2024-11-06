import InputPhone from '../input-phone';
import InputText from '..//input-text';
import ObscuredInputText from '../obscured-input-text';
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { IInputTextFieldProps } from './props';
import { styles } from './styles';

const InputTextField = forwardRef<any, IInputTextFieldProps>(
  (
    {
      label,
      IconComponent,
      onIconPress,
      fullWidth = false,
      securedEntry = false,
      phoneEntry = false,
      errorText,
      errorTestId,
      ...inputProps
    },
    ref
  ) => {
    return (
      <View
        style={[styles.container, fullWidth ? { alignSelf: 'stretch' } : {}]}
      >
        <Text style={styles.label}>{label}</Text>
        {phoneEntry ? (
          <View ref={ref} {...inputProps} />
        ) : securedEntry ? (
          <ObscuredInputText fullWidth={fullWidth} {...inputProps} />
        ) : (
          <InputText
            IconComponent={IconComponent}
            onIconPress={onIconPress}
            fullWidth={fullWidth}
            {...inputProps}
          />
        )}
        {errorText && (
          <Text style={styles.errorText} testID={errorTestId}>
            {errorText}
          </Text>
        )}
      </View>
    );
  }
);

export default InputTextField;

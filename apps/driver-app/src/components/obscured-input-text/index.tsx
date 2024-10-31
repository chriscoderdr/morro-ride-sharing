import InputText from "@/src/components/input-text";
import { IInputTextProps } from "@/src/components/input-text/props";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

interface IObscuredInputTextProps extends IInputTextProps {}

const ObscuredInputText: React.FC<IObscuredInputTextProps> = ({
  ...inputTextProps
}) => {
  const [isTextHidden, setIsTextHidden] = useState(true);

  const handleIconPress = () => {
    setIsTextHidden(!isTextHidden);
  };

  return (
    <InputText
      secureTextEntry={isTextHidden}
      textContentType="oneTimeCode"
      {...inputTextProps}
      IconComponent={
        isTextHidden ? (
          <AntDesign name="eye" size={20} color="black" />
        ) : (
          <AntDesign name="eyeo" size={20} color="black" />
        )
      }
      onIconPress={handleIconPress}
    />
  );
};

export default ObscuredInputText;

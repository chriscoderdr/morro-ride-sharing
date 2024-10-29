import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import InputText from "../input-text";
import { IInputTextProps } from "../input-text/props";

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

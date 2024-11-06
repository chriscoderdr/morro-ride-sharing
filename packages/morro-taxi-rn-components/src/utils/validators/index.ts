import React from "react";
import PhoneInput from "react-native-phone-number-input";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) => password.length >= 8;

const isValidName = (name: string) => name.trim().length >= 2;

const isValidPhone = (phone: string, phoneRef: React.MutableRefObject<PhoneInput>) => phoneRef.current?.isValidNumber(phone);


export { isValidEmail, isValidName, isValidPassword, isValidPhone };


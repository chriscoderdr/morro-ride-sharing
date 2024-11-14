"use strict";

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = password => password.length >= 8;
const isValidName = name => name.trim().length >= 2;
const isValidPhone = (phone, phoneRef) => phoneRef.current?.isValidNumber(phone);
export { isValidEmail, isValidName, isValidPassword, isValidPhone };
//# sourceMappingURL=index.js.map
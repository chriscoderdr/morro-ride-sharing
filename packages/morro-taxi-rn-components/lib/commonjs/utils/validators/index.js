"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPhone = exports.isValidPassword = exports.isValidName = exports.isValidEmail = void 0;
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
exports.isValidEmail = isValidEmail;
const isValidPassword = password => password.length >= 8;
exports.isValidPassword = isValidPassword;
const isValidName = name => name.trim().length >= 2;
exports.isValidName = isValidName;
const isValidPhone = (phone, phoneRef) => phoneRef.current?.isValidNumber(phone);
exports.isValidPhone = isValidPhone;
//# sourceMappingURL=index.js.map
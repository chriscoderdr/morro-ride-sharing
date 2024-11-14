"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
const styles = exports.styles = _reactNative.StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold'
  },
  small: {
    paddingVertical: 6,
    paddingHorizontal: 15
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 25
  }
});
//# sourceMappingURL=styles.js.map
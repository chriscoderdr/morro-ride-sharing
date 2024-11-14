"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  phoneContainer: {
    backgroundColor: 'transparent',
    width: "100%",
    shadowColor: 'transparent'
  },
  textContainer: {
    paddingTop: 18,
    paddingLeft: 80,
    paddingBottom: 18,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#D8DADC",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  countryPickerButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 1
  },
  codeText: {
    fontSize: 16
  },
  textInput: {
    fontSize: 16
  }
});
//# sourceMappingURL=styles.js.map
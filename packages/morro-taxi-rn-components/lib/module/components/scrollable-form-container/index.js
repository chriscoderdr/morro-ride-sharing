"use strict";

import KeyboardDismiss from "../keyboard-dismiss/index.js";
import { KeyboardAvoidingView, Platform, StyleSheet, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const ScrollableFormContainer = ({
  children
}) => {
  return /*#__PURE__*/_jsx(SafeAreaView, {
    style: {
      flex: 1
    },
    children: /*#__PURE__*/_jsx(KeyboardAvoidingView, {
      behavior: Platform.OS === 'ios' ? 'padding' : 'height',
      style: {
        flex: 1
      },
      children: /*#__PURE__*/_jsx(ScrollView, {
        contentContainerStyle: {
          flexGrow: 1
        },
        children: /*#__PURE__*/_jsx(KeyboardDismiss, {
          children: /*#__PURE__*/_jsx(View, {
            style: styles.container,
            children: children
          })
        })
      })
    })
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default ScrollableFormContainer;
//# sourceMappingURL=index.js.map
"use strict";

import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const animationTime = 300;
const AnimatedCard = ({
  children,
  isExiting = false,
  onExitComplete,
  style
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  useEffect(() => {
    if (isExiting) {
      Animated.parallel([Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      }), Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: animationTime,
        useNativeDriver: true
      })]).start(() => {
        if (onExitComplete) onExitComplete();
      });
    } else {
      Animated.parallel([Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      }), Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      })]).start();
    }
  }, [isExiting, fadeAnim, scaleAnim, onExitComplete]);
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [{
      opacity: fadeAnim,
      transform: [{
        scale: scaleAnim
      }]
    }, style],
    children: children
  });
};
export default AnimatedCard;
//# sourceMappingURL=index.js.map
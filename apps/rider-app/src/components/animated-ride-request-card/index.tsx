import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  isExiting?: boolean;
  onExitComplete?: () => void;
  style?: ViewStyle;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  isExiting = false,
  onExitComplete,
  style
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (isExiting) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => {
        if (onExitComplete) onExitComplete();
      });
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isExiting, fadeAnim, scaleAnim, onExitComplete]);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        },
        style
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;

import { Stack } from 'expo-router';
import useBackgroundLocation from '../hooks/use-background-location';
import useForegroundLocation from '../hooks/use-foreground-location';

export const Setup = () => {
  useBackgroundLocation();
  useForegroundLocation();
  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

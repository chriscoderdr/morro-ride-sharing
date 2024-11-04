import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuthToken } from '../hooks/use-auth-token';

export const Setup = () => {
  const router = useRouter();
  const authToken = useAuthToken();

  useEffect(() => {
    if (!authToken) {
      router.replace('/signup');
    } else {
      router.replace('/main');
    }
  }, []);

  return (
    <Stack initialRouteName="signup">
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { useAuthToken } from '../hooks/use-auth-token';
import { initializePendingRequests } from '../store/middleware/timeout-middleware';

export const Setup = () => {
  const router = useRouter();
  const authToken = useAuthToken();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializePendingRequests());
  }, [dispatch]);

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

import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { useAuthToken } from '@/src/hooks/use-auth-token';
// import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

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

  useEffect(() => {
    const keepScreenAwake = async () => {
      // await activateKeepAwakeAsync();
    };

    keepScreenAwake();

    return () => {
      // deactivateKeepAwake();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

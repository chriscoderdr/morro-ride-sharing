import { RootState } from '@/src/store';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Setup = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signup');
    } else {
      router.replace('/main');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const keepScreenAwake = async () => {
      await activateKeepAwakeAsync();
    };

    keepScreenAwake();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ title: 'Where to?' }} />
      <Stack.Screen
        name="confirm-ride"
        options={{ title: 'Plan Ride' }}
      />
      <Stack.Screen name="lookup-driver" />
    </Stack>
  );
};
export default Setup;

import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { useAuthToken } from '../hooks/use-auth-token';
import { initializePendingRequests } from '../store/middleware/timeout-middleware';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Setup = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializePendingRequests());
  }, [dispatch]);

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
    <Stack initialRouteName="signup">
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

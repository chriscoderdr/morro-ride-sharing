import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { clearAllErrors, clearError } from '@/src/store/slices/error-slice';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Setup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const requestRideId = useSelector(
    (state: RootState) => state.ride.rideRequestId
  );
  const ride = useSelector((state: RootState) => state.ride);

  useEffect(() => {
    dispatch(clearAllErrors());
    if (!isAuthenticated) {
      router.replace('/signup');
    } else {
      if (requestRideId && ride.status != 'completed') {
        router.replace('/lookup-driver');
      } else {
        router.replace('/main');
      }
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
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="lookup-driver" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

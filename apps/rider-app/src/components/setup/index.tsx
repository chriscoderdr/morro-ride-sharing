import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { clearRide } from '@/src/store/slices/ride-slice';
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

  // dispatch(clearRide());
  useEffect(() => {
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
      <Stack.Screen
        name="main"
        options={{ title: 'Where to?', headerBackButtonMenuEnabled: false }}
      />
      <Stack.Screen name="confirm-ride" options={{ title: 'Plan Ride' }} />
      <Stack.Screen name="lookup-driver" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Setup;

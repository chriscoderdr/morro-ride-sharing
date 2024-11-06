import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export const Setup = () => {
  const router = useRouter();
  //   const authToken = useAuthToken();
  //   const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     dispatch(initializePendingRequests());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (!authToken) {
  //       router.replace('/signup');
  //     } else {
  //       router.replace('/main');
  //     }
  //   }, []);

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

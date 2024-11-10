import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { registerDriver } from '@/src/store/slices/auth-slice';
import { useRouter } from 'expo-router';
import {
  IRegisterUser,
  ScrollableFormContainer,
  SignUpForm
} from 'react-native-morro-taxi-rn-components';
import { useSelector } from 'react-redux';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const router = useRouter();

  const onRegisterUser = (data: IRegisterUser) => {
    dispatch(registerDriver({ ...data }));
  };

  const onGoToLogin = () => {
    router.navigate('/login');
  };

  return (
    <ScrollableFormContainer>
      <SignUpForm
        isLoading={isLoading}
        registerUser={onRegisterUser}
        onGoToLogin={onGoToLogin}
      />
    </ScrollableFormContainer>
  );
}

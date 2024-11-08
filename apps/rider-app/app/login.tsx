import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { loginUser } from '@/src/store/slices/auth-slice';
import { useRouter } from 'expo-router';
import {
  LoginForm,
  ScrollableFormContainer,
  ILoginUser
} from 'react-native-morro-taxi-rn-components';
import { useSelector } from 'react-redux';

export default function Login() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const onLoginUser = (data: ILoginUser) => {
    dispatch(loginUser({ ...data }));
  };

  const onGoToRegister = () => {
    router.navigate('/signup');
  };

  return (
    <ScrollableFormContainer>
      <LoginForm
        onGoToRegister={onGoToRegister}
        isLoading={isLoading}
        loginUser={onLoginUser}
      />
    </ScrollableFormContainer>
  );
}

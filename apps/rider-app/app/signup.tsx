import { useAppDispatch } from '@/src/hooks/use-app-dispatch';
import { RootState } from '@/src/store';
import { useRegisterUserMutation } from '@/src/store/slices/api-slice';
import { registerUser } from '@/src/store/slices/auth-slice';
import {
  IRegisterUser,
  ScrollableFormContainer,
  SignUpForm
} from 'react-native-morro-taxi-rn-components';
import { useSelector } from 'react-redux';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const onRegisterUser = (data: IRegisterUser) => {
    dispatch(registerUser(data));
    console.log('Registering user:', data);
    console.log('Error:', error);
  };
  return (
    <ScrollableFormContainer>
      <SignUpForm isLoading={isLoading} registerUser={onRegisterUser} />
    </ScrollableFormContainer>
  );
}

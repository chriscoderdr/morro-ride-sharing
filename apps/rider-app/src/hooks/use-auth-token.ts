import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuthToken = () => {
  const accessToken = useSelector(
    (state: RootState) => state.auth.user.accessToken
  );
  return accessToken;
};

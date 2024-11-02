import { useSelector } from 'react-redux';
import { RootState } from '../store'; // Import the RootState type from your store

export const useAuthToken = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  return accessToken;
};

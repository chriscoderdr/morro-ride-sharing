import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store';
import { apiSlice } from '@/src/store/slices/api-slice';
import {
  LoginData,
  LoginResponse,
  RegisterResponse,
  DriverData,
  User
} from '@/src/api/models';
import { Alert } from 'react-native';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const loginDriver = createAsyncThunk<
  LoginResponse,
  LoginData,
  { state: RootState }
>('drivers/login', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(
      apiSlice.endpoints.loginDriver.initiate(data)
    ).unwrap();
    return response;
  } catch (response: any) {
    const status = response?.status;
    let errorMessage = '';
    switch (status) {
      case 'FETCH_ERROR':
        errorMessage =
          'Network error. Check your internet connection and try again.';
        break;
      default:
        errorMessage =
          response?.data?.error || 'Login failed. Please try again later.';
        break;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(response);
  }
});

export const registerDriver = createAsyncThunk<
  RegisterResponse,
  DriverData,
  { state: RootState }
>('drivers/register', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(
      apiSlice.endpoints.registerDriver.initiate(data)
    ).unwrap();
    return response;
  } catch (response: any) {
    const status = response?.status;
    let errorMessage = '';
    switch (status) {
      case 'FETCH_ERROR':
        errorMessage =
          'Network error. Check your internet connection and try again.';
        break;
      default:
        errorMessage =
          response?.data?.error ||
          'Registration failed. Please try again later.';
        break;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(response);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginDriver.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.user = {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            driverId: action.payload.driverId
          };
        }
      )
      .addCase(loginDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(registerDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerDriver.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.user = {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            driverId: action.payload.driverId
          };
        }
      )
      .addCase(registerDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      })
      .addDefaultCase((state) => {});
  }
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

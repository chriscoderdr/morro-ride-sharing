import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store';
import { apiSlice } from '@/src/store/slices/api-slice';
import {
  LoginData,
  LoginResponse,
  RegisterResponse,
  RiderData,
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

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginData,
  { state: RootState }
>('riders/login', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(
      apiSlice.endpoints.loginUser.initiate(data)
    ).unwrap();
    return response;
  } catch (response) {
    console.log(`debuging error: ${JSON.stringify(response)}`);
    const status = response?.status;
    let errorMessage = '';
    switch (status) {
      case 'FETCH_ERROR':
        errorMessage =
          'Oops! A network error occurred. Please check your internet connection and try again.';
        break;
      default:
        errorMessage =
          response?.data?.error ||
          'Something went wrong. Please try again later.';
        break;
    }
    Alert.alert('Error', errorMessage);
    return rejectWithValue(response);
  }
});

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RiderData,
  { state: RootState }
>('riders/register', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(
      apiSlice.endpoints.registerUser.initiate(data)
    ).unwrap();
    console.log(`debugging: ${JSON.stringify(response)}`);
    return response;
  } catch (response) {
    console.log(`debuging error: ${JSON.stringify(response)}`);
    const status = response?.status;
    let errorMessage = '';
    switch (status) {
      case 'FETCH_ERROR':
        errorMessage =
          'Oops! A network error occurred. Please check your internet connection and try again.';
        break;
      default:
        errorMessage =
          response?.data?.error ||
          'Something went wrong. Please try again later.';
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.user = {
            accessToken: action.payload.accessToken,
            id: action.payload.id,
            refreshToken: action.payload.refreshToken,
            name: action.payload.name
          };
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.error = null;
          state.user = {
            accessToken: action.payload.accessToken,
            id: action.payload.id,
            refreshToken: action.payload.refreshToken,
            name: action.payload.name
          };
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      })
      .addDefaultCase((state, action) => {
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

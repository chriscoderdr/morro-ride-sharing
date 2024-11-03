import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  driverId: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  driverId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string; driverId: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.driverId = action.payload.driverId;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.driverId = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;

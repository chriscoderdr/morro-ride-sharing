// TODO: handle all errors glboally in one place
import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    errors: []
  },
  reducers: {
    addError: (state, action) => {
      state.errors.push(action.payload);
    },
    clearError: (state, action) => {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    },
    clearAllErrors: (state) => {
      state.errors = [];
    }
  }
});

export const { addError, clearError, clearAllErrors } = errorSlice.actions;
export default errorSlice.reducer;

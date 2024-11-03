import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MqttState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  isEnabled: boolean;
}

const initialState: MqttState = {
  isConnected: false,
  isConnecting: false,
  error: null,
  isEnabled: true,
};

const mqttSlice = createSlice({
  name: 'mqtt',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isConnecting = true;
      state.error = null;
    },
    connectSuccess: (state) => {
      state.isConnected = true;
      state.isConnecting = false;
      state.error = null;
    },
    connectFailure: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.error = action.payload;
    },
    disconnect: (state) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.error = null;
    },
    toggleMqtt: (state) => {
      state.isEnabled = !state.isEnabled;
    },
  },
});

export const {
  startConnecting,
  connectSuccess,
  connectFailure,
  disconnect,
  toggleMqtt,
} = mqttSlice.actions;

export default mqttSlice.reducer;

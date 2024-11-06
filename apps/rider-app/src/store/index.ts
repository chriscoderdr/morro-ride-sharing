import { apiSlice } from '@/src/store/slices/api-slice';
import authReducer, { setTokens } from '@/src/store/slices/auth-slice';
import mqttReducer from '@/src/store/slices/mqtt-slice';
import rideRequestReducer from '@/src/store/slices/ride-request-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  createListenerMiddleware
} from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import fetchRideRequestsMiddleware from './middleware/fetch-ride-requests-middleware';
import timeoutMiddleware, {
  initializePendingRequests
} from './middleware/timeout-middleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['mqtt', apiSlice.reducerPath]
};

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  rideRequest: rideRequestReducer,
  mqtt: mqttReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER'
        ]
      }
    }).concat(
      apiSlice.middleware
    )
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

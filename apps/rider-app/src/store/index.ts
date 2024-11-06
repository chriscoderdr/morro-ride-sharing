import { apiSlice } from '@/src/store/slices/api-slice';
import authReducer from '@/src/store/slices/auth-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [apiSlice.reducerPath]
};

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer
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
    }).concat(apiSlice.middleware)
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

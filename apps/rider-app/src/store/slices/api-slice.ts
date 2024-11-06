import {
  RiderData,
  LoginData,
  LoginResponse,
  RegisterResponse
} from '@/src/api/models';
import config from '@/src/config';
import { RootState } from '@/src/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = config.MORRO_API_BASE_URL;

console.log(`API_BASE_URL: ${API_BASE_URL}`);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RiderData>({
      query: (data) => ({
        url: '/riders/register',
        method: 'POST',
        body: data,
        cache: 'no-cache',
        params: {
          'cacheBusting': Date.now()
        }
      }),
    }),
    loginUser: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: '/riders/login',
        method: 'POST',
        body: data,
        cache: 'no-cache'
      })
    })
  })
});

export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;

import {
  AcceptRequestData,
  AcceptRequestResponse,
  DriverData,
  LoginData,
  LoginResponse,
  RegisterResponse
} from '@/src/api/models';
import { RootState } from '@/src/store'; // Ensure you have the correct import path for your store
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.EXPO_PUBLIC_MORRO_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    registerDriver: builder.mutation<RegisterResponse, DriverData>({
      query: (data) => ({
        url: '/drivers/register',
        method: 'POST',
        body: data
      })
    }),
    loginDriver: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: '/drivers/login',
        method: 'POST',
        body: data
      })
    }),
    acceptRideRequest: builder.mutation<AcceptRequestResponse, AcceptRequestData>({
      query: (data) => ({
        url: '/drivers/acceptRequest',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useRegisterDriverMutation, useLoginDriverMutation, useAcceptRideRequestMutation } = apiSlice;

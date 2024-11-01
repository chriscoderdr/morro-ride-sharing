import { DriverData, RegisterResponse } from '@/src/api/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.EXPO_PUBLIC_MORRO_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL
  }),
  endpoints: (builder) => ({
    registerDriver: builder.mutation<RegisterResponse, DriverData>({
      query: (data) => ({
        url: '/drivers/register',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useRegisterDriverMutation } = apiSlice;

import {
  RiderData,
  LoginData,
  LoginResponse,
  RegisterResponse,
  CreateRideRequestResponse,
  CreateRideRequestData,
  RideEstimate,
  RideRequest
} from '@/src/api/models';
import config from '@/src/config';
import { RootState } from '@/src/store';
import { transformErrorResponse } from '@/src/utils/responses';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = config.MORRO_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    validateStatus: (response) => {
      console.log(`validating status: ${JSON.stringify(response)}`);
      return response?.status == 200;
    },
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
          cacheBusting: Date.now()
        }
      }),
      transformErrorResponse: transformErrorResponse
    }),
    loginUser: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: '/riders/login',
        method: 'POST',
        body: data,
        cache: 'no-cache',
        params: {
          cacheBusting: Date.now()
        }
      }),
      transformErrorResponse: transformErrorResponse
    }),
    createRideRequestRide: builder.mutation<
      CreateRideRequestResponse,
      CreateRideRequestData
    >({
      query: (data) => ({
        url: '/riders/createRideRequest',
        method: 'POST',
        body: data,
        cache: 'no-cache',
        params: {
          cacheBusting: Date.now()
        }
      }),
      transformErrorResponse: transformErrorResponse
    }),
    estimateRide: builder.mutation<RideEstimate, CreateRideRequestData>({
      query: (data) => ({
        url: '/riders/estimateRide',
        method: 'POST',
        body: data,
        cache: 'no-cache',
        params: {
          cacheBusting: Date.now()
        }
      }),
      transformErrorResponse: transformErrorResponse
    }),
    currentRideRequest: builder.query<RideRequest, any>({
      query: (data) => ({
        url: '/riders/currentRide',
        method: 'GET',
        cache: 'no-cache',
        params: {
          cacheBusting: Date.now()
        }
      }),
      transformErrorResponse: transformErrorResponse
    })
  })
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateRideRequestRideMutation,
  useEstimateRideMutation,
  useCurrentRideRequestQuery,
  useLazyCurrentRideRequestQuery
} = apiSlice;

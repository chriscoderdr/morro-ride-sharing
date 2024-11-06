import {
  AcceptRequestData,
  AcceptRequestResponse,
  DriverData,
  LoginData,
  LoginResponse,
  RegisterResponse,
  StartRequestData,
  StartRequestResponse
} from '@/src/api/models';
import config from '@/src/config';
import { RootState } from '@/src/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = config.MORRO_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['somethingelseKeyApi'],
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
    acceptRideRequest: builder.mutation<
      AcceptRequestResponse,
      AcceptRequestData
    >({
      query: (data) => ({
        url: '/drivers/acceptRequest',
        method: 'POST',
        body: data
      })
    }),
    startRideRequest: builder.mutation<StartRequestResponse, StartRequestData>({
      query: (data) => ({
        url: '/drivers/startRequest',
        method: 'POST',
        body: data
      })
    }),

    pickUpRideRequest: builder.mutation<StartRequestResponse, StartRequestData>(
      {
        query: (data) => ({
          url: '/drivers/pickUpRequest',
          method: 'POST',
          body: data
        })
      }
    ),
    completeRideRequest: builder.mutation<void, { rideRequestId: string }>({
      query: (data) => ({
        url: '/drivers/completeRequest',
        method: 'POST',
        body: data
      })
    }),
    getRideRequestsResponse: builder.query<{ data: any[] }, void>({
      keepUnusedDataFor: 0,
      query: () => ({
        url: `/drivers/rideRequests`,
        headers: {
          'Cache-Control': 'no-store',
          Pragma: 'no-cache'
        },
      }),
      forceRefetch: () => true,
      providesTags: ['somethingelseKeyApi']
    })
  })
});

export const {
  useRegisterDriverMutation,
  useLoginDriverMutation,
  useAcceptRideRequestMutation,
  useGetRideRequestsResponseQuery
} = apiSlice;

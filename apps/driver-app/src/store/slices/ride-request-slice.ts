import {
  AcceptRequestData,
  AcceptRequestResponse,
  RideRequest,
  StartRequestData,
  StartRequestResponse
} from '@/src/api/models';
import { RootState } from '@/src/store';
import { apiSlice } from '@/src/store/slices/api-slice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

interface RideRequestState {
  requests: RideRequest[];
}

const initialState: RideRequestState = {
  requests: []
};

export const selectCurrentRideRequest = (state: RootState) =>
  state.rideRequest.requests.find(
    (request) =>
      request.status === 'accepted' ||
      request.status === 'started' ||
      request.status === 'picked-up'
  );

export const acceptRideRequest = createAsyncThunk<
  AcceptRequestResponse,
  AcceptRequestData,
  { state: RootState }
>(
  'rideRequest/acceptRideRequest',
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await dispatch(
        apiSlice.endpoints.acceptRideRequest.initiate(data)
      ).unwrap();

      dispatch(
        updateRideRequestStatus({
          rideRequestId: data.rideRequestId,
          status: 'accepted',
          riderName: response.riderName,
          riderPhone: response.riderPhone
        })
      );

      const state = getState() as RootState;
      const pendingRequests = state.rideRequest.requests.filter(
        (request) =>
          request.status === 'pending' &&
          request.rideRequestId !== data.rideRequestId
      );

      pendingRequests.forEach((request) => {
        dispatch(
          updateRideRequestStatus({
            rideRequestId: request.rideRequestId,
            status: 'declined'
          })
        );
      });

      return response;
    } catch (error: any) {
      console.error('Error accepting ride request:', error);
      Alert.alert('Error completing ride request:', error);
      return rejectWithValue(error);
    }
  }
);

export const startRideRequest = createAsyncThunk<
  StartRequestResponse,
  StartRequestData,
  { state: RootState }
>(
  'rideRequest/startRideRequest',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        apiSlice.endpoints.startRideRequest.initiate(data)
      ).unwrap();
      dispatch(
        updateRideRequestStatus({
          rideRequestId: data.rideRequestId,
          status: 'started'
        })
      );
      return response;
    } catch (error: any) {
      console.error('Error starting ride request:', error);
      Alert.alert('Error completing ride request:', error);
      return rejectWithValue(error);
    }
  }
);

export const pickUpRideRequest = createAsyncThunk<
  StartRequestResponse,
  StartRequestData,
  { state: RootState }
>(
  'rideRequest/pickUpRideRequest',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        apiSlice.endpoints.pickUpRideRequest.initiate(data)
      ).unwrap();
      dispatch(
        updateRideRequestStatus({
          rideRequestId: data.rideRequestId,
          status: 'picked-up'
        })
      );
      return response;
    } catch (error: any) {
      console.error('Error picking up ride request:', error);
      Alert.alert('Error completing ride request:', error);
      return rejectWithValue(error);
    }
  }
);

export const completeRideRequest = createAsyncThunk<
  void,
  { rideRequestId: string },
  { state: RootState }
>(
  'rideRequest/completeRideRequest',
  async ({ rideRequestId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        apiSlice.endpoints.completeRideRequest.initiate({ rideRequestId })
      ).unwrap();
      dispatch(
        updateRideRequestStatus({ rideRequestId, status: 'dropped-off' })
      );
      return response;
    } catch (error: any) {
      console.error('Error completing ride request:', error);
      Alert.alert('Error completing ride request:', error);
      return rejectWithValue(error);
    }
  }
);

export const setRideRequestWithTimeout = createAsyncThunk(
  'rideRequest/setRideRequestWithTimeout',
  async (
    rideRequestData: Omit<RideRequest, 'status'>,
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const currentRide = selectCurrentRideRequest(state);

    if (!currentRide) {
      dispatch(
        addRideRequest({
          ...rideRequestData,
          status: 'pending',
          createdAt: Date.now()
        })
      );

      setTimeout(() => {
        const state = getState() as RootState;
        const request = state.rideRequest.requests.find(
          (req) => req.rideRequestId === rideRequestData.rideRequestId
        );

        if (request && request.status === 'pending') {
          dispatch(
            updateRideRequestStatus({
              rideRequestId: rideRequestData.rideRequestId,
              status: 'declined'
            })
          );
        }
      }, 15000);
    }
  }
);

const rideRequestSlice = createSlice({
  name: 'rideRequest',
  initialState,
  reducers: {
    addRideRequest: (state, action: PayloadAction<RideRequest>) => {
      state.requests.push(action.payload);
    },
    updateRideRequestStatus: (
      state,
      action: PayloadAction<{
        rideRequestId: string;
        status: RideRequest['status'];
        riderName?: string;
        riderPhone?: string;
      }>
    ) => {
      const request = state.requests.find(
        (req) => req.rideRequestId === action.payload.rideRequestId
      );
      if (request) {
        request.status = action.payload.status;
        if (action.payload.riderName) {
          request.riderName = action.payload.riderName;
          request.riderPhone = action.payload.riderPhone;
        }
      }
    },
    removeRideRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(
        (req) => req.rideRequestId !== action.payload
      );
    },
    updateRideRequest: (
      state,
      action: PayloadAction<{ rideRequestId: string; data: RideRequest }>
    ) => {
      const index = state.requests.findIndex(
        (req) => req.rideRequestId === action.payload.rideRequestId
      );
      if (index !== -1) {
        state.requests[index] = {
          ...state.requests[index],
          ...action.payload.data
        };
      }
    },
    addRideRequests: (state, action: PayloadAction<RideRequest[]>) => {
      state.requests = action.payload;
    },
    clearRideRequests: (state) => {
      state.requests = [];
    },
    updateRideRequestDistanceTimes: (
      state,
      action: PayloadAction<{
        rideRequestId: string;
        tripTimeDistance: { distance: string; time: string };
        pickupTimeDistance: { distance: string; time: string };
      }>
    ) => {
      const request = state.requests.find(
        (req) => req.rideRequestId === action.payload.rideRequestId
      );
      if (request) {
        request.tripTimeDistance = action.payload.tripTimeDistance;
        request.pickupTimeDistance = action.payload.pickupTimeDistance;
      }
    }
  }
});

export const {
  addRideRequest,
  updateRideRequestStatus,
  clearRideRequests,
  removeRideRequest,
  addRideRequests,
  updateRideRequest,
  updateRideRequestDistanceTimes
} = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

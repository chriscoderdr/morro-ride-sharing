import {
  AcceptRequestData,
  AcceptRequestResponse,
  StartRequestData,
  StartRequestResponse
} from '@/src/api/models';
import { RootState } from '@/src/store';
import { apiSlice } from '@/src/store/slices/api-slice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface TimeDistance {
  distance: string;
  time: string;
}

export interface RideRequest {
  rideRequestId: string;
  estimatedPrice: string | null;
  pickupTimeDistance: TimeDistance | null;
  pickupLocation: Location | null;
  tripTimeDistance: TimeDistance | null;
  tripLocation: Location | null;
  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  riderName?: string | null;
  riderPhone?: string | null;
}

interface RideRequestState {
  requests: RideRequest[];
}

const initialState: RideRequestState = {
  requests: []
};

// Thunk to accept a ride request
export const acceptRideRequest = createAsyncThunk<
  AcceptRequestResponse,
  AcceptRequestData,
  { state: RootState }
>(
  'rideRequest/acceptRideRequest',
  async (data, { dispatch, rejectWithValue }) => {
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
      return response;
    } catch (error) {
      console.error('Error accepting ride request:', error);
      return rejectWithValue(error);
    }
  }
);

// Thunk to start a ride request
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
    } catch (error) {
      console.error('Error starting ride request:', error);
      return rejectWithValue(error);
    }
  }
);

// Thunk to handle timeout for a specific pending ride request
export const setRideRequestWithTimeout = createAsyncThunk(
  'rideRequest/setRideRequestWithTimeout',
  async (
    rideRequestData: Omit<RideRequest, 'status'>,
    { dispatch, getState }
  ) => {
    dispatch(addRideRequest({ ...rideRequestData, status: 'pending' }));

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
    }, 15000); // 15 seconds
  }
);

export const pickUpRideRequest = createAsyncThunk<
  StartRequestResponse, // Assuming the response structure is similar to StartRequestResponse
  StartRequestData, // Assuming we use similar data structure as StartRequestData
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
    } catch (error) {
      console.error('Error picking up ride request:', error);
      return rejectWithValue(error);
    }
  }
);

export const completeRideRequest = createAsyncThunk<
  void,
  { rideRequestId: string },
  { state: RootState }
>('rideRequest/completeRideRequest', async ({ rideRequestId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(apiSlice.endpoints.completeRideRequest.initiate({ rideRequestId })).unwrap();
    dispatch(updateRideRequestStatus({ rideRequestId, status: 'dropped-off' }));
    return response;
  } catch (error) {
    console.error('Error completing ride request:', error);
    return rejectWithValue(error);
  }
});

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
    clearRideRequests: (state) => {
      state.requests = []; // Clear all requests
    },
    removeRideRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(
        (req) => req.rideRequestId !== action.payload
      );
    }
  }
});

export const {
  addRideRequest,
  updateRideRequestStatus,
  clearRideRequests,
  removeRideRequest
} = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

import { AcceptRequestData, AcceptRequestResponse } from '@/src/api/models';
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
  status: 'pending' | 'accepted' | 'declined' | 'started' | 'picked-up' | 'dropped-off';
  riderName?: string | null;
  riderPhone?: string | null;
}

interface RideRequestState {
  requests: RideRequest[];
}

const initialState: RideRequestState = {
  requests: []
};

// Thunks to update ride request status
export const acceptRideRequest = createAsyncThunk<
  AcceptRequestResponse,
  AcceptRequestData,
  { state: RootState }
>('rideRequest/acceptRideRequest', async (data, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(apiSlice.endpoints.acceptRideRequest.initiate(data)).unwrap();
    console.log('Accepted ride request:', response);
    // Dispatch an action to update the ride request status and rider name in the store
    dispatch(updateRideRequestStatus({
      rideRequestId: data.rideRequestId,
      status: 'accepted',
      riderName: response.riderName,
      riderPhone: response.riderPhone
    }));
    return response;
  } catch (error) {
    console.error('Error accepting ride request:', error);
    return rejectWithValue(error);
  }
});

// Thunks for other ride request status changes
export const startRideRequest = createAsyncThunk<
  void,
  { rideRequestId: string },
  { state: RootState }
>('rideRequest/startRideRequest', async ({ rideRequestId }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(updateRideRequestStatus({ rideRequestId, status: 'started' }));
  } catch (error) {
    console.error('Error starting ride request:', error);
    return rejectWithValue(error);
  }
});

export const pickUpRideRequest = createAsyncThunk<
  void,
  { rideRequestId: string },
  { state: RootState }
>('rideRequest/pickUpRideRequest', async ({ rideRequestId }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(updateRideRequestStatus({ rideRequestId, status: 'picked-up' }));
  } catch (error) {
    console.error('Error picking up ride request:', error);
    return rejectWithValue(error);
  }
});

export const dropOffRideRequest = createAsyncThunk<
  void,
  { rideRequestId: string },
  { state: RootState }
>('rideRequest/dropOffRideRequest', async ({ rideRequestId }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(updateRideRequestStatus({ rideRequestId, status: 'dropped-off' }));
  } catch (error) {
    console.error('Error dropping off ride request:', error);
    return rejectWithValue(error);
  }
});

// Thunk to handle timeout for a specific pending ride request
export const setRideRequestWithTimeout = createAsyncThunk(
  'rideRequest/setRideRequestWithTimeout',
  async (rideRequestData: Omit<RideRequest, 'status'>, { dispatch, getState }) => {
    dispatch(addRideRequest({ ...rideRequestData, status: 'pending' }));

    setTimeout(() => {
      const state = getState() as RootState;
      const request = state.rideRequest.requests.find(
        (req) => req.rideRequestId === rideRequestData.rideRequestId
      );

      if (request && request.status === 'pending') {
        dispatch(updateRideRequestStatus({ rideRequestId: rideRequestData.rideRequestId, status: 'declined' }));
      }
    }, 15000); // 15 seconds
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
      action: PayloadAction<{ rideRequestId: string; status: RideRequest['status']; riderName?: string; riderPhone?: string; }>
    ) => {
      const request = state.requests.find((req) => req.rideRequestId === action.payload.rideRequestId);
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
      state.requests = state.requests.filter((req) => req.rideRequestId !== action.payload);
    }
  }
});

export const { addRideRequest, updateRideRequestStatus, clearRideRequests, removeRideRequest } = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

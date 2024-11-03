// ride-request-slice.ts

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

export interface RideRequestState {
  rideRequestId: string | null;
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
  riderName: string | null;
}

const initialState: RideRequestState = {
  rideRequestId: null,
  estimatedPrice: null,
  pickupTimeDistance: null,
  pickupLocation: null,
  tripTimeDistance: null,
  tripLocation: null,
  status: 'pending',
  riderName: null
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
      return response;
    } catch (error) {
      console.error('Error accepting ride request:', error);
      return rejectWithValue(error);
    }
  }
);

// Thunk to handle timeout for pending ride request
export const setRideRequestWithTimeout = createAsyncThunk(
  'rideRequest/setRideRequestWithTimeout',
  async (
    rideRequestData: Omit<RideRequestState, 'status' | 'riderName'>,
    { dispatch }
  ) => {
    dispatch(setRideRequest({ ...rideRequestData, status: 'pending' }));

    // Set a timeout to automatically change the status to declined if not accepted
    setTimeout(() => {
      dispatch(clearRideRequest());
    }, 15000); // 15 seconds
  }
);

const rideRequestSlice = createSlice({
  name: 'rideRequest',
  initialState,
  reducers: {
    setRideRequest: (
      state,
      action: PayloadAction<{
        rideRequestId: string;
        estimatedPrice: string;
        pickupTimeDistance: TimeDistance;
        pickupLocation: Location;
        tripTimeDistance: TimeDistance;
        tripLocation: Location;
      }>
    ) => {
      const {
        rideRequestId,
        estimatedPrice,
        pickupTimeDistance,
        pickupLocation,
        tripTimeDistance,
        tripLocation
      } = action.payload;
      state.rideRequestId = rideRequestId;
      state.estimatedPrice = estimatedPrice;
      state.pickupTimeDistance = pickupTimeDistance;
      state.pickupLocation = pickupLocation;
      state.tripTimeDistance = tripTimeDistance;
      state.tripLocation = tripLocation;
      state.status = 'pending';
    },
    clearRideRequest: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(acceptRideRequest.fulfilled, (state, action) => {
      state.pickupLocation = {
        latitude: action.payload.pickupLocation.coordinates[1],
        longitude: action.payload.pickupLocation.coordinates[0],
        address: action.payload.pickupAddress || '' // Assuming pickupAddress is available in the payload
      };
      state.tripLocation = {
        latitude: action.payload.dropOffLocation.coordinates[1],
        longitude: action.payload.dropOffLocation.coordinates[0],
        address: action.payload.dropOffAddress || '' // Assuming dropOffAddress is available in the payload
      };
      state.riderName = action.payload.riderName;
      state.status = 'accepted';
    });
    builder.addCase(setRideRequestWithTimeout.fulfilled, (state) => {
      state.status = 'declined';
    });
  }
});

export const { setRideRequest, clearRideRequest } = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

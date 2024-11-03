// ride-request-slice.ts

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
  isActive: boolean;
}

const initialState: RideRequestState = {
  rideRequestId: null,
  estimatedPrice: null,
  pickupTimeDistance: null,
  pickupLocation: null,
  tripTimeDistance: null,
  tripLocation: null,
  isActive: false,
};

// Async thunk to handle timeout
export const setRideRequestWithTimeout = createAsyncThunk(
  'rideRequest/setRideRequestWithTimeout',
  async (rideRequestData: Omit<RideRequestState, 'isActive'>, { dispatch }) => {
    dispatch(setRideRequest(rideRequestData));

    // Set a timeout to automatically deactivate the ride request
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
      state.isActive = true;
    },
    clearRideRequest: () => initialState
  }
});

export const { setRideRequest, clearRideRequest } = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface RideRequestState {
  rideRequestId: string | null;
  estimatedPrice: string | null;
  pickupTimeDistance: string | null;
  pickupLocation: Location | null;
  tripTimeDistance: string | null;
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

const rideRequestSlice = createSlice({
  name: 'rideRequest',
  initialState,
  reducers: {
    setRideRequest: (
      state,
      action: PayloadAction<{
        rideRequestId: string;
        estimatedPrice: string;
        pickupTimeDistance: string;
        pickupLocation: Location;
        tripTimeDistance: string;
        tripLocation: Location;
      }>
    ) => {
      const { rideRequestId, estimatedPrice, pickupTimeDistance, pickupLocation, tripTimeDistance, tripLocation } = action.payload;
      state.rideRequestId = rideRequestId;
      state.estimatedPrice = estimatedPrice;
      state.pickupTimeDistance = pickupTimeDistance;
      state.pickupLocation = pickupLocation;
      state.tripTimeDistance = tripTimeDistance;
      state.tripLocation = tripLocation;
      state.isActive = true;
    },
    clearRideRequest: () => Object.assign(initialState),
  },
});

export const { setRideRequest, clearRideRequest } = rideRequestSlice.actions;
export default rideRequestSlice.reducer;

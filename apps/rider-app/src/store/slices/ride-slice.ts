import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store';

export interface Place {
  address: string;
  coordinates: [number, number];
}

interface RideState {
  isInProgress: boolean;
  driver: any | null;
  pickup: Place | null;
  dropoff: Place | null;
}

const initialState: RideState = {
  isInProgress: false,
  driver: null,
  pickup: null,
  dropoff: null
};

const rideSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRideInProgress: (state, action: PayloadAction<boolean>) => {
      state.isInProgress = action.payload;
    },
    setRidePlaces: (
      state,
      action: PayloadAction<{ pickup: Place; dropoff: Place }>
    ) => {
      state.pickup = action.payload.pickup;
      state.dropoff = action.payload.dropoff;
    },
    setRidePickup: (state, action: PayloadAction<Place>) => {
      state.pickup = action.payload;
    },
    setRideDropoff: (state, action: PayloadAction<Place>) => {
      state.dropoff = action.payload;
    },
    clearRide: (state) => {
      state.pickup = null;
      state.dropoff = null;
    }
  }
});

export const {
  setRidePickup,
  setRideDropoff,
  clearRide,
  setRidePlaces,
  setRideInProgress
} = rideSlice.actions;

export const selectCurrentPickup = (state: RootState) => state.ride.pickup;
export const selectCurrentDropOff = (state: RootState) => state.ride.dropoff;
export const selectRideIsInProgress = (state: RootState) =>
  state.ride.isInProgress;

export default rideSlice.reducer;

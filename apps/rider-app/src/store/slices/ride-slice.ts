import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store';
import { apiSlice } from './api-slice';
import {
  CreateRideRequestData,
  CreateRideRequestResponse,
  RideRequest
} from '@/src/api/models';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { addError, clearAllErrors } from './error-slice';

export interface Place {
  address: string;
  coordinates: [number, number];
}

export interface RideState {
  rideRequestId: string | null;
  isInProgress: boolean;
  driver: any | null;
  pickup: Place | null;
  dropoff: Place | null;
  status:
    | 'pending'
    | 'accepted'
    | 'arrived'
    | 'picked-up'
    | 'dropped-off'
    | 'completed'
    | 'cancelled'
    | 'started'
    | 'in-progress'
    | 'completed'
    | 'declined'
    | null;
  estimatePrice: string | null;
}

const initialState: RideState = {
  rideRequestId: null,
  isInProgress: false,
  driver: null,
  pickup: null,
  dropoff: null,
  status: 'pending',
  estimatePrice: null
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    createRide: (state, action: PayloadAction<any>) => {
      state.rideRequestId = action.payload.rideRequestId;
      state.isInProgress = false;
      state.driver = null;
      state.status = 'pending';
      state.pickup = {
        address: action.payload.pickup.address,
        coordinates: [
          action.payload.pickup.longitude,
          action.payload.pickup.latitude
        ]
      };
      state.dropoff = {
        address: action.payload.dropOff.address,
        coordinates: [
          action.payload.dropOff.longitude,
          action.payload.dropOff.latitude
        ]
      };
      state.estimatePrice = action.payload.estimatePrice;
      console.log(`createRide: ${JSON.stringify(action.payload)}`);
      console.log(`createRide: ${JSON.stringify(state)}`);
    },
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
    setStatus: (state, action: PayloadAction<RideState['status']>) => {
      state.status = action.payload;
    },
    clearRide: (state) => {
      state.pickup = null;
      state.dropoff = null;
      state.isInProgress = false;
      state.driver = null;
      state.status = null;
      state.rideRequestId = null;
      state.estimatePrice = null;
    },
    updateRide: (state, action: PayloadAction<any>) => {
      if (
        state.status !== 'completed' &&
        action.payload.rideRequestId == state.rideRequestId
      ) {
        state.status = action.payload.status;
        state.driver = action.payload.driver;
      } else if (state.rideRequestId !== action.payload.rideRequestId) {
        state.pickup = null;
        state.dropoff = null;
        state.isInProgress = false;
        state.driver = null;
        state.status = null;
        state.rideRequestId = null;
        state.estimatePrice = null;
      }
    },
    completeRide: (state) => {
      state.status = 'completed';
      state.isInProgress = false;
    }
  }
});

export const createRideRequest = createAsyncThunk<
  CreateRideRequestResponse,
  CreateRideRequestData,
  { state: RootState }
>(
  'rideRequest/createRideRequest',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        apiSlice.endpoints.createRideRequestRide.initiate(data)
      ).unwrap();
      dispatch(
        createRide({
          rideRequestId: response.rideRequestId,
          pickup: data?.pickupLocation,
          dropOff: data?.dropOffLocation,
          estimatePrice: data?.estimatePrice
        })
      );
      return response;
    } catch (error) {
      Alert.alert('Error', error);
      console.error('Error creatingRideRequest:', error);
      return rejectWithValue(error);
    }
  }
);

export const fetchRideRequest = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('rideRequest/fetchRideRequest', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await dispatch(
      apiSlice.endpoints.currentRideRequest.initiate({
        date: new Date().toISOString()
      })
    ).unwrap();
    dispatch(
      updateRide({
        rideRequestId: response.rideRequestId,
        status: response.status,
        driver: response.driver
      })
    );
    dispatch(clearAllErrors());
    console.log(`fetchRideRequest: ${JSON.stringify(response)}`);
    return response;
  } catch (error) {
    dispatch(clearAllErrors());
    dispatch(addError(error));
    return rejectWithValue(error);
  }
});

export const {
  setRidePickup,
  setRideDropoff,
  clearRide,
  setRidePlaces,
  setRideInProgress,
  setStatus,
  createRide,
  updateRide,
  completeRide
} = rideSlice.actions;

export const selectCurrentPickup = (state: RootState) => state.ride.pickup;
export const selectCurrentDropOff = (state: RootState) => state.ride.dropoff;
export const selectRideIsInProgress = (state: RootState) =>
  state.ride.status !== 'pending' && state.ride.status !== 'dropped-off';

export default rideSlice.reducer;

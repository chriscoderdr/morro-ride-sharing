// In fetchRideRequestsMiddleware.ts
import { RideRequest } from '@/src/api/models';
import config from '@/src/config';
import { Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../../store';
import {
  addRideRequest,
  updateRideRequest
} from '../slices/ride-request-slice';
import { initializePendingRequests } from './timeout-middleware';

const fetchRideRequestsMiddleware: Middleware = (store: any) => {
  let lastFetchTime: Date | null = null;

  return (next) => async (action) => {
    if (initializePendingRequests.match(action)) {
      const now = new Date();

      if (!lastFetchTime || now.getTime() - lastFetchTime.getTime() > 10000) {
        lastFetchTime = now;

        if (store.getState().auth.accessToken) {
          await fetchAndUpdateRideRequests(store.dispatch, store.getState);
        }
      }
    }

    return next(action);
  };
};

const fetchAndUpdateRideRequests = async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  try {
    // Make a direct Axios request to fetch ride requests
    const response = await axios.get(
      config.MORRO_API_BASE_URL + '/drivers/rideRequests',
      {
        baseURL: config.MORRO_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`
        }
      }
    );
    const newData = response.data.data;
    console.log('Fetched ride requests:', JSON.stringify(newData));

    const state = getState();
    const existingRequests = state.rideRequest.requests;

    const existingRequestIds = existingRequests.map((req) => req.rideRequestId);
    const fetchedRequestIds = response.data.data.map(
      (req: RideRequest) => req.rideRequestId
    );

    newData.forEach((rideRequest: any) => {
      const { rideRequestId } = rideRequest;
      console.log(`checking ride request for id`, rideRequest.rideRequestId);
      if (existingRequestIds.includes(rideRequestId)) {
        dispatch(
          updateRideRequest({
            rideRequestId,
            data: rideRequest
          })
        );
      } else {
        dispatch(addRideRequest(rideRequest));
      }
    });
  } catch (error) {
    console.error('Error fetching ride requests:', error);
  }
};

// Helper function to check if a ride request has changed
const hasChanged = (existingRequest: RideRequest, newRequest: RideRequest) => {
  return (
    existingRequest.status !== newRequest.status ||
    existingRequest.updatedAt !== newRequest.updatedAt
  );
};

export default fetchRideRequestsMiddleware;

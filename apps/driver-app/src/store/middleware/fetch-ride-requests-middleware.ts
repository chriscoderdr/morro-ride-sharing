import { Middleware } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import { apiSlice } from '../slices/api-slice';
import {
  addRideRequests,
  clearRideRequests
} from '../slices/ride-request-slice';
import { initializePendingRequests } from './timeout-middleware';

const fetchRideRequestsMiddleware: Middleware =
  (store: any) => (next) => async (action) => {
    if (initializePendingRequests.match(action)) {
      if (store.getState().auth.accessToken) {
        await fetchAndUpdateRideRequests(store.dispatch);
      }
    }
    return next(action);
  };

const fetchAndUpdateRideRequests = async (dispatch: AppDispatch) => {
  try {
    await dispatch(apiSlice.util.invalidateTags(['RideRequestResponse']));
    const response = await dispatch(
      apiSlice.endpoints.getRideRequestsResponse.initiate(undefined, {
        forceRefetch: true
      })
    ).unwrap();
    console.log('vamo a ver que sale:', response);
    dispatch(clearRideRequests());
    setTimeout(() => {
      dispatch(addRideRequests(response.data));
    }, 500);

    //   // console.log('Transformed rideRequests:', transformedRideRequests);
  } catch (error) {
    console.error('Error fetching ride requests:', error);
  }
};

export default fetchRideRequestsMiddleware;

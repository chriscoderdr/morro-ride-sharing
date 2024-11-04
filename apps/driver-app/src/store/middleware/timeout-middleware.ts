import { createAction, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
    addRideRequest,
    updateRideRequestStatus
} from '../slices/ride-request-slice';

export const initializePendingRequests = createAction(
  'rideRequest/initializePendingRequests'
);

const timeoutMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action: any) => {
    console.log(`Middleware: action.type=${action.type}`);
    // Allow action to pass through to other reducers
    const result = next(action);

    const setRequestTimeout = (rideRequestId: string) => {
      setTimeout(() => {
        const currentState = getState() as RootState;
        const request = currentState.rideRequest.requests.find(
          (req) => req.rideRequestId === rideRequestId
        );

        if (request && request.status === 'pending') {
          dispatch(
            updateRideRequestStatus({
              rideRequestId,
              status: 'declined'
            })
          );
        }
      }, 15000); // 15 seconds
    };

    // Check if action is of type `addRideRequest`
    if (addRideRequest.match(action)) {
      const { rideRequestId, status } = action.payload;

      // Only set a timeout if the status is 'pending'
      if (status === 'pending') {
        setRequestTimeout(rideRequestId);
      }
    }

    // Handle initializePendingRequests action
    if (initializePendingRequests.match(action)) {
      const state = getState() as RootState;
      const pendingRequests = state.rideRequest.requests.filter(
        (req) => req.status === 'pending'
      );

      // Set a timeout for each pending request
      pendingRequests.forEach((request) =>
        setRequestTimeout(request.rideRequestId)
      );
    }

    return result;
  };

export default timeoutMiddleware;

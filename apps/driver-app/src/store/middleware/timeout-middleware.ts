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
    const result = next(action);

    const setRequestTimeout = (rideRequestId: string, createdAt: number) => {
      const now = Date.now();
      const timeElapsed = now - createdAt;

      if (timeElapsed > 10000) {
        dispatch(
          updateRideRequestStatus({
            rideRequestId,
            status: 'declined'
          })
        );
      } else {
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
        }, 15000 - timeElapsed);
      }
    };

    if (addRideRequest.match(action)) {
      const { rideRequestId, status, createdAt } = action.payload;

      if (status === 'pending') {
        setRequestTimeout(rideRequestId, createdAt);
      }
    }

    if (initializePendingRequests.match(action)) {
      const state = getState() as RootState;
      const pendingRequests = state.rideRequest.requests.filter(
        (req) => req.status === 'pending'
      );

      pendingRequests.forEach((request) =>
        setRequestTimeout(request.rideRequestId, request.createdAt)
      );
    }

    return result;
  };

export default timeoutMiddleware;

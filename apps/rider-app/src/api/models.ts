export interface ApiResponse {
  message: string;
}

export interface RiderData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: string;
  accessToken: string;
  refreshToken: string;
  name: string;
}

export interface RegisterResponse extends ApiResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface CreateRideRequestResponse extends ApiResponse {
  rideRequestId: string;
}

export interface CreateRideRequestData {
  pickupLocation: Location;
  dropOffLocation: Location;
}

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
  createdAt: number;
  rideRequestId: string;
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
  riderName?: string | null;
  riderPhone?: string | null;
  updatedAt: number;
}

export interface ApiResponse {
  message: string;
}

export interface DriverData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse extends ApiResponse {
  driverId: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  driverId: string;
}

export interface AcceptRequestData {
  rideRequestId: string;
}

export interface AcceptRequestResponse extends ApiResponse {
  rideRequestId: string;
  riderName: string;
  riderPhone: string;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  dropOffLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface StartRequestData {
  rideRequestId: string;
}

export interface StartRequestResponse extends ApiResponse {
  rideRequestId: string;
  status: 'started';
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
}

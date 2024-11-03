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

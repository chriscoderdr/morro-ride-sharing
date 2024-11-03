// Define the common API response interface
export interface ApiResponse {
  message: string;
}

// Define driver data interfaces
export interface DriverData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// Define responses for driver registration
export interface RegisterResponse extends ApiResponse {
  driverId: string;
  accessToken: string;
  refreshToken: string;
}

// Define login data interfaces
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
  driverId: string;
}

// Define data interfaces for accepting a ride request
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

// Define data interfaces for starting a ride request
export interface StartRequestData {
  rideRequestId: string;
}

export interface StartRequestResponse extends ApiResponse {
  rideRequestId: string;
  status: 'started';
}

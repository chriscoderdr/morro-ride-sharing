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

export interface ApiResponse {
  message: string;
}



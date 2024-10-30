import { ApiResponse, DriverData } from './models';

const API_BASE_URL = process.env.EXPO_PUBLIC_MORRO_API_BASE_URL;

export const registerDriver = async (driverData: DriverData): Promise<ApiResponse> => {
  try {
    console.log('TEST', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/drivers/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driverData),
    });
    console.log('TEST2', await response.text())
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Network request failed') {
      console.log(error)
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    throw error;
  }
};

export const loginDriver = async (driverData: DriverData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/drivers/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(driverData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Network request failed') {
      throw new Error('Network error: Please check your internet connection and try again.');
    }
    throw error;
  }
};

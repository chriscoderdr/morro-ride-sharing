import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
const ACCESS_TOKEN_EXPIRATION = '1d';
const REFRESH_TOKEN_EXPIRATION = '7d';

export const generateAccessToken = (driverId: string) => {
  return jwt.sign({ driverId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

export const generateRefreshToken = () => {
  return uuidv4(); // Generates a unique ID for the refresh token
};

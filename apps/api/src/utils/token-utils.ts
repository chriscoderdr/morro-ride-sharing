import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
const ACCESS_TOKEN_EXPIRATION = '365d';
const REFRESH_TOKEN_EXPIRATION = '365d';

export const generateAccessToken = (
  driverOrRiderId: string,
  userType: string
) => {
  return jwt.sign(
    { userId: driverOrRiderId, userType: userType },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
};

export const generateRefreshToken = () => {
  return uuidv4(); // Generates a unique ID for the refresh token
};

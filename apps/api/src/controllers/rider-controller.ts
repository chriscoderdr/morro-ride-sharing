import { queueService } from '@/services';
import bcrypt from 'bcrypt';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { RideRequest, Rider } from '../models';
import logger from '../utils/logger';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/token-utils';

interface RegisterRiderRequestBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface RideRequestLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface CreateRideRequestBody {
  pickupLocation: RideRequestLocation;
  dropOffLocation: RideRequestLocation;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface NearbyDriver {
  location: Location;
}

interface PickupDropOff {
  time: number;
  distance: number;
}

interface EstimateRideRequestResponse {
  estimatePrice: number;
  nearbyDrivers: NearbyDriver[];
  pickup: PickupDropOff;
  dropOff: PickupDropOff;
}

// Utility function to send error response
const sendErrorResponse = (ctx: Context, status: number, message: string) => {
  ctx.status = status;
  ctx.body = { error: message };
};

// Register Rider
export const registerRider = async (ctx: Context) => {
  const { name, email, phone, password } = ctx.request
    .body as RegisterRiderRequestBody;

  // Validation
  if (!name || !email || !phone || !password) {
    return sendErrorResponse(ctx, 400, 'All fields are required.');
  }
  if (password.length < 8) {
    return sendErrorResponse(
      ctx,
      400,
      'Password must be at least 8 characters.'
    );
  }

  try {
    // Check if rider exists
    const existingRider = await Rider.findOne({
      where: { [Op.or]: [{ email }, { phone }] }
    });
    if (existingRider) {
      return sendErrorResponse(
        ctx,
        409,
        'Email or phone number already registered.'
      );
    }

    // Create new rider
    const newRider = await Rider.create({ name, email, phone, password });
    const accessToken = generateAccessToken(newRider.dataValues.id, 'rider');
    const refreshToken = generateRefreshToken();
    await newRider.update({ refreshToken });

    // Success response
    ctx.status = 201;
    ctx.body = {
      message: 'Rider registered successfully.',
      id: newRider.dataValues.id,
      accessToken,
      refreshToken,
      name: newRider.dataValues.name
    };
  } catch (error) {
    logger.error('Error registering rider:', error);
    sendErrorResponse(ctx, 500, 'Server error. Please try again later.');
  }
};

// Create Ride Request
export const createRideRequest = async (ctx: Context) => {
  const { pickupLocation, dropOffLocation } = ctx.request
    .body as CreateRideRequestBody;
  const riderId = ctx.state.user.id;

  // Validation
  if (!pickupLocation || !dropOffLocation) {
    return sendErrorResponse(
      ctx,
      400,
      'Pickup location and drop-off location are required for a ride request.'
    );
  }

  try {
    // Create new ride request
    const newRideRequest = await RideRequest.create({
      riderId,
      pickupLocation: {
        type: 'Point',
        coordinates: [pickupLocation.longitude, pickupLocation.latitude]
      },
      pickupAddress: pickupLocation.address,
      dropOffLocation: {
        type: 'Point',
        coordinates: [dropOffLocation.longitude, dropOffLocation.latitude]
      },
      dropOffAddress: dropOffLocation.address,
      status: 'pending'
    });

    logger.info(`Ride request created: ${newRideRequest.pickupAddress}`);

    // Queue the ride request
    await queueService.addRideRequestToQueue(newRideRequest);

    // Success response
    ctx.status = 201;
    ctx.body = {
      message: 'Ride request created successfully and added to the queue.',
      rideRequestId: newRideRequest.id
    };
  } catch (error) {
    logger.error('Error creating ride request:', error);
    sendErrorResponse(ctx, 500, 'Server error. Please try again later.');
  }
};

export const login = async (ctx: Context) => {
  const { email, password } = ctx.request.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Email and password are required.' };
    return;
  }

  try {
    const user = await Rider.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid email or password.' };
      return;
    }

    const accessToken = generateAccessToken(user.dataValues.id, 'rider');
    const refreshToken = generateRefreshToken();

    await user.update({ refreshToken });

    ctx.status = 200;
    ctx.body = {
      id: user.dataValues.id,
      accessToken,
      refreshToken,
      name: user.dataValues.name
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const estimateRide = async (ctx: Context) => {
  const { pickupLocation, dropOffLocation } = ctx.request
    .body as CreateRideRequestBody;

  if (!pickupLocation || !dropOffLocation) {
    ctx.status = 400;
    ctx.body = {
      error:
        'Pickup location and drop-off location are required for a ride request.'
    };
    return;
  }
  const response: EstimateRideRequestResponse = {
    estimatePrice: 100,
    nearbyDrivers: [
      { location: { latitude: 14.6, longitude: 120.985 } },
      { location: { latitude: 14.602, longitude: 120.987 } }
    ],
    pickup: {
      time: 5,
      distance: 2
    },
    dropOff: {
      time: 10,
      distance: 5
    }
  };

  ctx.status = 200;

  ctx.body = response;
};

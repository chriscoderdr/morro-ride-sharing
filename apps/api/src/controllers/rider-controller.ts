import { Context } from 'koa';
import { Op } from 'sequelize';
import RideRequest from '../models/ride-request';
import Rider from '../models/rider';
import logger from '../utils/logger';
import { generateAccessToken, generateRefreshToken } from '../utils/token-utils';

export const registerRider = async (ctx: Context) => {
  const { name, email, phone, password } = ctx.request.body as {
    name: string;
    email: string;
    phone: string;
    password: string;
  };

  if (!name || !email || !phone || !password) {
    ctx.status = 400;
    ctx.body = { error: 'All fields are required.' };
    return;
  }
  if (password.length < 8) {
    ctx.status = 400;
    ctx.body = { error: 'Password must be at least 8 characters.' };
    return;
  }

  try {
    const existingRider = await Rider.findOne({
      where: { [Op.or]: [{ email }, { phone }] }
    });
    if (existingRider) {
      ctx.status = 409;
      ctx.body = { error: 'Email or phone number already registered.' };
      return;
    }

    // Create the new rider
    const newRider = await Rider.create({ name, email, phone, password });

    // Generate tokens
    const accessToken = generateAccessToken(newRider.dataValues.id);
    const refreshToken = generateRefreshToken();

    // Store the refresh token in the database
    await newRider.update({ refreshToken });

    ctx.status = 201;
    ctx.body = {
      message: 'Rider registered successfully.',
      riderId: newRider.dataValues.id,
      accessToken,
      refreshToken
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const createRideRequest = async (ctx: Context) => {
  const {
    riderId,
    pickupLocation,
    dropOffLocation,
    estimatedPrice,
    pickupTimeDistance,
    tripTimeDistance
  } = ctx.request.body as {
    riderId: string;
    pickupLocation: {
      latitude: number;
      longitude: number;
      address: string;
    };
    dropOffLocation: {
      latitude: number;
      longitude: number;
      address: string;
    };
    estimatedPrice: string;
    pickupTimeDistance: string;
    tripTimeDistance: string;
  };

  if (
    !riderId ||
    !pickupLocation ||
    !dropOffLocation ||
    !estimatedPrice ||
    !pickupTimeDistance ||
    !tripTimeDistance
  ) {
    ctx.status = 400;
    ctx.body = { error: 'All fields are required for a ride request.' };
    return;
  }

  try {
    const newRideRequest = await RideRequest.create({
      riderId,
      pickupLocation,
      dropOffLocation,
      estimatedPrice,
      pickupTimeDistance,
      tripTimeDistance,
      status: 'pending'
    });

    ctx.status = 201;
    ctx.body = {
      message: 'Ride request created successfully.',
      rideRequestId: newRideRequest.dataValues.id
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

import bcrypt from 'bcrypt';
import { Context } from 'koa';
import { Op } from 'sequelize';
import Driver from '../models/driver';
import RideRequest from '../models/ride-request';
import Rider from '../models/rider'; // Import the Rider model
import logger from '../utils/logger';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/token-utils';

export const registerDriver = async (ctx: Context) => {
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
    const existingDriver = await Driver.findOne({
      where: { [Op.or]: [{ email }, { phone }] }
    });
    if (existingDriver) {
      ctx.status = 409;
      ctx.body = { error: 'Email or phone number already registered.' };
      return;
    }

    // Create the new driver
    const newDriver = await Driver.create({ name, email, phone, password });

    // Generate tokens
    const accessToken = generateAccessToken(newDriver.dataValues.id, 'driver');
    const refreshToken = generateRefreshToken();

    // Store the refresh token in the database
    await newDriver.update({ refreshToken });

    ctx.status = 201;
    ctx.body = {
      message: 'Driver registered successfully.',
      driverId: newDriver.dataValues.id,
      accessToken,
      refreshToken
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const loginDriver = async (ctx: Context) => {
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
    const driver = await Driver.findOne({ where: { email } });

    if (!driver || !(await bcrypt.compare(password, driver.password))) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid email or password.' };
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(driver.dataValues.id, 'driver');
    const refreshToken = generateRefreshToken();

    // Store the new refresh token in the database
    await driver.update({ refreshToken });

    ctx.status = 200;
    ctx.body = {
      message: 'Login successful.',
      driverId: driver.dataValues.id,
      accessToken,
      refreshToken
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const acceptRideRequest = async (ctx: Context) => {
  const driverId = ctx.state.user.id;
  const { rideRequestId } = ctx.request.body as { rideRequestId: string };

  if (!rideRequestId) {
    ctx.status = 400;
    ctx.body = { error: 'Ride request ID is required.' };
    return;
  }

  try {
    // Fetch the ride request
    const rideRequest = await RideRequest.findOne({
      where: { id: rideRequestId }
    });

    // Validate the ride request status
    if (!rideRequest) {
      ctx.status = 404;
      ctx.body = { error: 'Ride request not found.' };
      return;
    }
    if (rideRequest.status !== 'pending') {
      ctx.status = 400;
      ctx.body = { error: 'This ride request is no longer available.' };
      return;
    }

    // Fetch the associated rider information
    const rider = await Rider.findOne({ where: { id: rideRequest.riderId } });
    if (!rider) {
      ctx.status = 404;
      ctx.body = { error: 'Rider not found for this ride request.' };
      return;
    }

    // Update the ride request to accepted
    rideRequest.status = 'accepted';
    rideRequest.driverId = driverId;
    await rideRequest.save();

    logger.info(`Ride request ${rideRequestId} accepted by driver ${driverId}`);

    ctx.status = 200;
    ctx.body = {
      message: 'Ride request accepted successfully.',
      rideRequestId: rideRequest.id,
      riderName: rider.dataValues.name, // Retrieved from Rider model
      pickupLocation: rideRequest.pickupLocation,
      dropOffLocation: rideRequest.dropOffLocation
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

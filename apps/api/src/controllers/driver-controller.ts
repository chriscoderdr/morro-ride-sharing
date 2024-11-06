import { transformRideData } from '@/utils/ride-data-transformer';
import bcrypt from 'bcrypt';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { Driver, RideRequest, Rider } from '../models';

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

    const newDriver = await Driver.create({ name, email, phone, password });

    const accessToken = generateAccessToken(newDriver.dataValues.id, 'driver');
    const refreshToken = generateRefreshToken();

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

    const accessToken = generateAccessToken(driver.dataValues.id, 'driver');
    const refreshToken = generateRefreshToken();

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
  logger.info(`Driver ${driverId} accepting ride request ${rideRequestId}`);

  if (!rideRequestId) {
    ctx.status = 400;
    ctx.body = { error: 'Ride request ID is required.' };
    return;
  }

  try {
    const rideRequest = await RideRequest.findOne({
      where: { id: rideRequestId }
    });

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

    const rider = await Rider.findOne({ where: { id: rideRequest.riderId } });
    if (!rider) {
      ctx.status = 404;
      ctx.body = { error: 'Rider not found for this ride request.' };
      return;
    }

    rideRequest.status = 'accepted';
    rideRequest.driverId = driverId;
    await rideRequest.save();

    logger.info(`Ride request ${rideRequestId} accepted by driver ${driverId}`);

    ctx.status = 200;
    ctx.body = {
      message: 'Ride request accepted successfully.',
      rideRequestId: rideRequest.id,
      riderName: rider.dataValues.name,
      riderPhone: rider.dataValues.phone,
      pickupLocation: rideRequest.pickupLocation,
      dropOffLocation: rideRequest.dropOffLocation
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const startRideRequest = async (ctx: Context) => {
  const driverId = ctx.state.user.id;
  const { rideRequestId } = ctx.request.body as { rideRequestId: string };
  logger.info(`Driver ${driverId} starting ride request ${rideRequestId}`);

  if (!rideRequestId) {
    ctx.status = 400;
    ctx.body = { error: 'Ride request ID is required.' };
    return;
  }

  try {
    const rideRequest = await RideRequest.findOne({
      where: { id: rideRequestId, driverId: driverId }
    });

    if (!rideRequest) {
      ctx.status = 404;
      ctx.body = { error: 'Ride request not found.' };
      return;
    }
    if (rideRequest.status !== 'accepted') {
      ctx.status = 400;
      ctx.body = {
        error: 'The ride request must be in accepted status to start the ride.'
      };
      return;
    }

    rideRequest.status = 'started';
    await rideRequest.save();

    logger.info(`Ride request ${rideRequestId} started by driver ${driverId}`);

    ctx.status = 200;
    ctx.body = {
      message: 'Ride started successfully.',
      rideRequestId: rideRequest.id,
      pickupLocation: rideRequest.pickupLocation,
      dropOffLocation: rideRequest.dropOffLocation
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const pickUpRideRequest = async (ctx: Context) => {
  const driverId = ctx.state.user.id;
  const { rideRequestId } = ctx.request.body as { rideRequestId: string };
  logger.info(
    `Driver ${driverId} picking up rider for request ${rideRequestId}`
  );

  if (!rideRequestId) {
    ctx.status = 400;
    ctx.body = { error: 'Ride request ID is required.' };
    return;
  }

  try {
    const rideRequest = await RideRequest.findOne({
      where: { id: rideRequestId, driverId: driverId }
    });

    if (!rideRequest) {
      ctx.status = 404;
      ctx.body = { error: 'Ride request not found.' };
      return;
    }
    if (rideRequest.status !== 'started') {
      ctx.status = 400;
      ctx.body = {
        error:
          'The ride request must be in started status to pick up the rider.'
      };
      return;
    }

    rideRequest.status = 'picked-up';
    await rideRequest.save();

    logger.info(
      `Ride request ${rideRequestId} picked up by driver ${driverId}`
    );

    ctx.status = 200;
    ctx.body = {
      message: 'Rider picked up successfully.',
      rideRequestId: rideRequest.id,
      pickupLocation: rideRequest.pickupLocation,
      dropOffLocation: rideRequest.dropOffLocation
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const completeRideRequest = async (ctx: Context) => {
  const driverId = ctx.state.user.id;
  const { rideRequestId } = ctx.request.body as { rideRequestId: string };
  logger.info(`Driver ${driverId} completing ride request ${rideRequestId}`);

  if (!rideRequestId) {
    ctx.status = 400;
    ctx.body = { error: 'Ride request ID is required.' };
    return;
  }

  try {
    const rideRequest = await RideRequest.findOne({
      where: { id: rideRequestId, driverId: driverId }
    });

    if (!rideRequest) {
      ctx.status = 404;
      ctx.body = { error: 'Ride request not found.' };
      return;
    }
    if (rideRequest.status !== 'picked-up') {
      ctx.status = 400;
      ctx.body = {
        error:
          'The ride request must be in picked-up status to complete the ride.'
      };
      return;
    }

    rideRequest.status = 'dropped-off';
    await rideRequest.save();

    logger.info(
      `Ride request ${rideRequestId} completed by driver ${driverId}`
    );

    ctx.status = 200;
    ctx.body = {
      message: 'Ride completed successfully.',
      rideRequestId: rideRequest.id,
      pickupLocation: rideRequest.pickupLocation,
      dropOffLocation: rideRequest.dropOffLocation
    };
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

export const getRideRequests = async (ctx: Context) => {
  const driverId = ctx.state.user.id; // Assumes driver is authenticated, and ID is stored in the token
  logger.info(`Fetching ride requests for driver ${driverId}`);


  try {
    const rideRequests = await RideRequest.findAll({
      where: { driverId },
      order: [['updatedAt', 'DESC']] // Orders by updatedAt descending
    });
    const user = (await Driver.findByPk(driverId)) as any;
    const transformedRideRequests = await Promise.all(
      rideRequests.map((rideRequest) => transformRideData(user, rideRequest))
    );

    ctx.status = 200;
    ctx.body = { data: transformedRideRequests }; // Returns an empty array if no ride requests are found
    logger.info(
      `Fetched ${rideRequests.length} ride requests for driver ${driverId}`
    );
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

import { queueService } from '@/services';
import bcrypt from 'bcrypt';
import { Context } from 'koa';
import { Op } from 'sequelize';
import { Driver, RideRequest, Rider } from '../models';
import logger from '../utils/logger';
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/token-utils';
import mapService from '@/services/map-service';
import priceCalculator from '@/utils/price-calculator';
import formatter from '@/utils/formatter';
import { findNearbyDrivers } from '@/utils/nearby-drivers';
import { transformRideData } from '@/utils/ride-data-transformer';

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
  time: string;
  distance: string;
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
    // Check for existing ride requests with a status other than 'dropped-off' or 'pending'
    const activeRideRequest = await RideRequest.findOne({
      where: {
        riderId,
        status: { [Op.notIn]: ['dropped-off', 'pending', 'declined'] }
      }
    });

    if (activeRideRequest) {
      return sendErrorResponse(
        ctx,
        400,
        'An active ride request already exists. Complete or cancel it before creating a new request.'
      );
    }

    // Update all existing pending ride requests for the rider to 'canceled'
    await RideRequest.update(
      { status: 'declined' },
      { where: { riderId, status: 'pending' } }
    );

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
  try {
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

    if (
      pickupLocation.latitude === dropOffLocation.latitude &&
      pickupLocation.longitude === dropOffLocation.longitude
    ) {
      ctx.status = 400;
      ctx.body = {
        error: 'Pickup and drop-off locations cannot be the same.'
      };
      return;
    }

    const pickupToDropOffRoute = await mapService.getRoute([
      [pickupLocation.longitude, pickupLocation.latitude],
      [dropOffLocation.longitude, dropOffLocation.latitude]
    ]);

    const nearbyDrivers = (
      await findNearbyDrivers(
        pickupLocation.longitude,
        pickupLocation.latitude,
        5000
      )
    ).map((driver) => ({
      location: {
        latitude: driver.location?.coordinates[1],
        longitude: driver.location?.coordinates[0]
      }
    }));

    if (nearbyDrivers.length === 0) {
      ctx.status = 404;
      ctx.body = { error: 'No drivers available near the pickup location.' };
      logger.info('No drivers available near the pickup location.');
      return;
    }

    logger.info(
      `Found ${nearbyDrivers.length} drivers near the pickup location.`
    );
    const nearestDriver = nearbyDrivers[0];

    const nearestDriverToPickupRoute = await mapService.getRoute([
      [nearestDriver.location.longitude!, nearestDriver.location.latitude!],
      [pickupLocation.longitude, pickupLocation.latitude]
    ]);

    const pickupEstimate = {
      time: formatter.formatTime(nearestDriverToPickupRoute.duration),
      distance: formatter.formatDistance(nearestDriverToPickupRoute.distance)
    };

    const nearbyDriversMapped = nearbyDrivers.map((driver) => ({
      location: {
        latitude: driver.location.latitude!,
        longitude: driver.location.longitude!
      }
    }));

    const response: EstimateRideRequestResponse = {
      estimatePrice: priceCalculator.calculateRidePrice(
        pickupToDropOffRoute.distance
      ),

      nearbyDrivers: nearbyDriversMapped,
      pickup: pickupEstimate,
      dropOff: {
        time: formatter.formatTime(pickupToDropOffRoute.duration),
        distance: formatter.formatDistance(pickupToDropOffRoute.distance)
      }
    };

    ctx.status = 200;
    ctx.body = response;

    logger.info(
      `Estimated ride details: Price - ${response.estimatePrice}, Pickup Time - ${pickupEstimate.time}, Drop-off Distance - ${response.dropOff.distance}`
    );
  } catch (error: any) {
    logger.error(`Failed to estimate ride: ${error.message}`);
    ctx.status = 500;
    ctx.body = { error: 'Internal server error while estimating ride.' };
  }
};

export const getCurrentRideRequest = async (ctx: Context) => {
  const riderId = ctx.state.user.id;
  logger.info(`Fetching current ride request for rider ${riderId}`);

  try {
    const currentRideRequest = await RideRequest.findOne({
      where: {
        riderId,
        status: {
          [Op.notIn]: ['pending'] // Retrieves rides with any status except 'dropped-off'
        }
      },
      order: [['updatedAt', 'DESC']]
    });

    if (!currentRideRequest) {
      ctx.status = 404;
      ctx.body = { error: 'No current ride request found for this rider.' };
      return;
    }

    // Check if a driver is assigned and exists
    if (currentRideRequest.driverId) {
      const driver = await Driver.findByPk(currentRideRequest.driverId);

      if (driver) {
        const transformedRideRequest = await transformRideData(
          driver,
          currentRideRequest
        );
        ctx.status = 200;
        ctx.body = {
          ...transformedRideRequest,
          driver: {
            name: driver.name,
            phone: driver.phone,
            location: driver.location?.coordinates
          }
        };
      } else {
        logger.warn(`Driver with ID ${currentRideRequest.driverId} not found.`);
        ctx.status = 200;
        ctx.body = {
          status: currentRideRequest.status,
          driver: null
        };
      }
    } else {
      // Return only the ride status if no driver is assigned
      ctx.status = 200;
      ctx.body = {
        status: currentRideRequest.status,
        rideRequestId: currentRideRequest.id,
        createdAt: currentRideRequest.createdAt,
        updatedAt: currentRideRequest.updatedAt
      };
    }

    logger.info(`Fetched current ride request for rider ${riderId}`);
  } catch (error) {
    logger.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

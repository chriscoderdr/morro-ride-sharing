import { Job, Worker } from 'bullmq';
import dotenv from 'dotenv';
import { connect, MqttClient } from 'mqtt';
import logger from './utils/logger';
import { findNearbyDrivers } from './utils/nearby-drivers';
import { transformRideData } from './utils/ride-data-transformer';

dotenv.config();

const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379', 10)
};

const mqttConfig = {
  host: 'mqtt://192.168.68.106:1883',
  options: {
    clientId: process.env.MQTT_CLIENT_ID || 'ride-request-processor',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  }
};

const mqttClient: MqttClient = connect(mqttConfig.host, mqttConfig.options);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker.');
});

mqttClient.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

interface RideRequestData {
  id: string;
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
}

const processRideRequest = async (job: Job<RideRequestData>) => {
  const { id, riderId, pickupLocation, dropOffLocation } = job.data;

  const rideRequest = {
    id,
    riderId,
    pickupLocation,
    dropOffLocation
  };

  const topic = 'drivers/ride-requests';
  const message = JSON.stringify(rideRequest);

  const drivers = await findNearbyDrivers(
    pickupLocation.coordinates[0],
    pickupLocation.coordinates[1],
    100000
  );

  logger.info(`Found ${drivers.length} drivers near the pickup location.`);
  logger.info(`Sending ride request ${id} to drivers.`);
  logger.info(`Ride request details: ${message}`);
  logger.info(`Drivers: ${drivers.map((driver) => driver.id).join(', ')}`);

  drivers.forEach(async (driver) => {
    logger.info(`Found driver ${driver.id} near the pickup location.`);
    const rideData = await transformRideData(driver, rideRequest);
    mqttClient.publish(
      `/drivers/${driver.id}/ride-request`,
      JSON.stringify(rideData),
      (error) => {
        if (error) {
          console.error('Failed to send ride request through MQTT:', error);
        } else {
          console.log(`Ride request ${id} sent to drivers.`);
        }
      }
    );
  });
};

const rideRequestWorker = new Worker<RideRequestData>(
  'ride_requests',
  async (job) => {
    await processRideRequest(job);
  },
  { connection: redisConfig }
);

rideRequestWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

rideRequestWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

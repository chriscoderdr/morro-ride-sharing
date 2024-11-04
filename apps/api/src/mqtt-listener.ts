import jwt from 'jsonwebtoken';
import mqtt from 'mqtt';
import Driver from './models/driver';
import logger from './utils/logger';

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://192.168.68.106:1883';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

const mqttClient = mqtt.connect(MQTT_BROKER_URL, {
  rejectUnauthorized: false,
});

logger.info('Connecting to MQTT broker');

mqttClient.on('connect', () => {
  logger.info('Connected to MQTT broker');

  mqttClient.subscribe('/drivers/+/location', (err, granted) => {
    if (err) {
      logger.error('Failed to subscribe to driver topics: ' + err.message);
    } else {
      logger.info(
        `Subscribed to /drivers/+/location, granted: ${JSON.stringify(granted)}`
      );
    }
  });
});

mqttClient.on('error', (error) => {
  logger.error('MQTT Connection Error: ' + error.message);
});

mqttClient.on('offline', () => {
  logger.warn('MQTT client went offline');
});

mqttClient.on('close', () => {
  logger.warn('MQTT client connection closed');
});

mqttClient.on('reconnect', () => {
  logger.info('Attempting to reconnect to MQTT broker');
});

mqttClient.on('message', async (topic, message) => {
  logger.info(`Received message on topic ${topic}: ${message.toString()}`);
  try {
    const driverAccessToken = topic.split('/')[2];
    const decoded = jwt.verify(driverAccessToken, ACCESS_TOKEN_SECRET) as {
      userId: string;
    };

    const payload = JSON.parse(message.toString());
    const { latitude, longitude, isAvailable } = payload;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid latitude or longitude values');
    }

    await Driver.update(
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        lastLocationUpdatedAt: new Date(),
        isAvailable: isAvailable,
      },
      {
        where: { id: decoded.userId },
      }
    );

    logger.info(`Updated location for driver ${decoded.userId}`);
  } catch (error: any) {
    logger.error('Error processing message: ' + error.message);
  }
});

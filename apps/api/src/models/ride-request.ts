// src/models/ride-request.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface RideRequestAttributes {
  id: string;
  pickupLocation: { type: 'Point'; coordinates: [number, number] };
  pickupAddress: string;
  dropOffLocation: { type: 'Point'; coordinates: [number, number] };
  dropOffAddress: string;
  status:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  createdAt?: Date;
  updatedAt?: Date;
  driverId?: string | null;
  riderId?: string;
}

interface RideRequestCreationAttributes
  extends Optional<
    RideRequestAttributes,
    'id' | 'status' | 'driverId' | 'riderId'
  > {}

class RideRequest
  extends Model<RideRequestAttributes, RideRequestCreationAttributes>
  implements RideRequestAttributes
{
  public id!: string;
  public pickupLocation!: { type: 'Point'; coordinates: [number, number] };
  public pickupAddress!: string;
  public dropOffLocation!: { type: 'Point'; coordinates: [number, number] };
  public dropOffAddress!: string;
  public status!:
    | 'pending'
    | 'accepted'
    | 'declined'
    | 'started'
    | 'picked-up'
    | 'dropped-off';
  public createdAt!: Date;
  public updatedAt!: Date;
  public driverId!: string | null;
  public riderId!: string;
}

// Initialize the RideRequest model with its attributes and configuration
RideRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pickupLocation: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: false
    },
    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropOffLocation: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: false
    },
    dropOffAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'accepted',
        'declined',
        'started',
        'picked-up',
        'dropped-off'
      ),
      defaultValue: 'pending',
      allowNull: false
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'id'
      }
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'riders',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'ride_requests',
    timestamps: true,
    hooks: {
      // Sets the status to 'pending' if not provided
      beforeCreate: (rideRequest) => {
        if (!rideRequest.status) {
          rideRequest.status = 'pending';
        }
      }
    }
  }
);

export default RideRequest;

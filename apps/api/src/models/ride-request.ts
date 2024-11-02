import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Driver from './driver';
import Rider from './rider';

interface RideRequestAttributes {
  id: string;
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
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'canceled';
  createdAt?: Date;
  updatedAt?: Date;
  driverId?: string | null;
  riderId?: string; // New field for rider ID
}

interface RideRequestCreationAttributes
  extends Optional<RideRequestAttributes, 'id' | 'status' | 'driverId' | 'riderId'> {}

class RideRequest
  extends Model<RideRequestAttributes, RideRequestCreationAttributes>
  implements RideRequestAttributes
{
  public id!: string;
  public pickupLocation!: {
    latitude: number;
    longitude: number;
    address: string;
  };
  public dropOffLocation!: {
    latitude: number;
    longitude: number;
    address: string;
  };
  public estimatedPrice!: string;
  public pickupTimeDistance!: string;
  public tripTimeDistance!: string;
  public status!: 'pending' | 'accepted' | 'declined' | 'expired' | 'canceled';
  public createdAt!: Date;
  public updatedAt!: Date;
  public driverId!: string | null;
  public riderId!: string;
}

RideRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pickupLocation: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isLocationValid(value: any) {
          if (
            typeof value !== 'object' ||
            typeof value.latitude !== 'number' ||
            typeof value.longitude !== 'number' ||
            typeof value.address !== 'string'
          ) {
            throw new Error('Invalid pickup location format');
          }
        }
      }
    },
    dropOffLocation: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isLocationValid(value: any) {
          if (
            typeof value !== 'object' ||
            typeof value.latitude !== 'number' ||
            typeof value.longitude !== 'number' ||
            typeof value.address !== 'string'
          ) {
            throw new Error('Invalid drop-off location format');
          }
        }
      }
    },
    estimatedPrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickupTimeDistance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tripTimeDistance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined', 'expired', 'canceled'),
      defaultValue: 'pending',
      allowNull: false
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Driver,
        key: 'id'
      }
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Rider,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'ride_requests',
    timestamps: true,
    hooks: {
      beforeCreate: (rideRequest) => {
        if (!rideRequest.status) {
          rideRequest.status = 'pending';
        }
      }
    }
  }
);

export default RideRequest;

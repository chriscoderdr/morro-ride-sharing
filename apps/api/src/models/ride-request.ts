import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Driver from './driver';
import Rider from './rider';

interface RideRequestAttributes {
  id: string;
  pickupLocation: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  pickupAddress: string;
  dropOffLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  dropOffAddress: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'canceled';
  createdAt?: Date;
  updatedAt?: Date;
  driverId?: string | null;
  riderId?: string;
}

interface RideRequestCreationAttributes
  extends Optional<RideRequestAttributes, 'id' | 'status' | 'driverId' | 'riderId'> {}

class RideRequest
  extends Model<RideRequestAttributes, RideRequestCreationAttributes>
  implements RideRequestAttributes
{
  public id!: string;
  public pickupLocation!: {
    type: 'Point';
    coordinates: [number, number];
  };
  public pickupAddress!: string;
  public dropOffLocation!: {
    type: 'Point';
    coordinates: [number, number];
  };
  public dropOffAddress!: string;
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
      primaryKey: true,
    },
    pickupLocation: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: false,
    },
    pickupAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropOffLocation: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: false,
    },
    dropOffAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined', 'expired', 'canceled'),
      defaultValue: 'pending',
      allowNull: false,
    },
    driverId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Driver,
        key: 'id',
      },
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Rider,
        key: 'id',
      },
    },
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
      },
    },
  }
);

export default RideRequest;
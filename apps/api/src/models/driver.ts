import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

interface DriverAttributes {
  id: string; // Change `id` to a string to store UUIDs
  name: string;
  email: string;
  phone: string;
  password: string;
  refreshToken?: string; // Field for storing refresh token
  createdAt?: Date;
  updatedAt?: Date;
  loginAt?: Date;
  lastLocationLatitude?: number;
  lastLocationLongitude?: number;
  lastLocationUpdatedAt?: Date;
  isAvailable?: boolean;
}

interface DriverCreationAttributes extends Optional<DriverAttributes, 'id'> {}

class Driver extends Model<DriverAttributes, DriverCreationAttributes> {
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.dataValues.password);
  }
}

Driver.init(
  {
    id: {
      type: DataTypes.UUID,              // Set data type to UUID
      defaultValue: DataTypes.UUIDV4,     // Automatically generate a UUID v4
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLocationLatitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lastLocationLongitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lastLocationUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'drivers',
    hooks: {
      beforeCreate: async (driver) => {
        driver.dataValues.password = await bcrypt.hash(driver.dataValues.password, saltRounds);
      }
    },
    timestamps: true
  }
);

export default Driver;

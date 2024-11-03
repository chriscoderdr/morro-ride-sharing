import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

interface DriverAttributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  loginAt?: Date;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  lastLocationUpdatedAt?: Date;
  isAvailable?: boolean;
}

interface DriverCreationAttributes extends Optional<DriverAttributes, 'id'> {}

class Driver extends Model<DriverAttributes, DriverCreationAttributes> {
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public refreshToken?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public loginAt?: Date;
  public location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  public lastLocationUpdatedAt?: Date;
  public isAvailable!: boolean;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

Driver.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true,
    },
    lastLocationUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'drivers',
    hooks: {
      beforeCreate: async (driver) => {
        driver.password = await bcrypt.hash(driver.password, saltRounds);
      },
    },
    timestamps: true,
  }
);

export default Driver;

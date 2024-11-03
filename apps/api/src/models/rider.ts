import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

interface RiderAttributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  loginAt?: Date;
}

interface RiderCreationAttributes extends Optional<RiderAttributes, 'id'> {}

class Rider extends Model<RiderAttributes, RiderCreationAttributes> {
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.dataValues.password);
  }
}

Rider.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    }
  },
  {
    sequelize,
    tableName: 'riders',
    hooks: {
      beforeCreate: async (rider) => {
        rider.dataValues.password = await bcrypt.hash(
          rider.dataValues.password,
          saltRounds
        );
      }
    },
    timestamps: true
  }
);

export default Rider;

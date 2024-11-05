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

class Rider
  extends Model<RiderAttributes, RiderCreationAttributes>
  implements RiderAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public refreshToken?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public loginAt?: Date;

  // Compare encrypted password with a provided password
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Initialize the Rider model with attributes and table configuration
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
    timestamps: true,
    hooks: {
      // Encrypt the password before saving a new rider to the database
      beforeCreate: async (rider) => {
        rider.password = await bcrypt.hash(rider.password, saltRounds);
      }
    }
  }
);

export default Rider;

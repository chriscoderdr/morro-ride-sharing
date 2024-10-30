import bcrypt from "bcrypt";
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

interface DriverAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  loginAt?: Date;
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
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "drivers",
    hooks: {
      beforeCreate: async (driver) => {
        console.error('driver', driver)
        console.error('password: ', driver.dataValues.password);
        console.error('driver.salt', saltRounds);
        driver.dataValues.password = await bcrypt.hash(driver.dataValues.password, saltRounds);
      },
    },
    timestamps: true,
  }
);

export default Driver;

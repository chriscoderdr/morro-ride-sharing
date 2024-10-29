import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Driver extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

Driver.init(
  {
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
  },
  {
    sequelize,
    tableName: 'Driver',
    hooks: {
      beforeCreate: async (driver) => {
        driver.password = await bcrypt.hash(driver.password, 10);
      },
    },
  }
);

export default Driver;

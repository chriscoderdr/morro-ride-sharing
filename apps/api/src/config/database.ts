import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// @ts-ignore
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
  operatorsAliases: false,
});

export default sequelize;
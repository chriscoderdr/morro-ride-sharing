import { Context } from 'koa';
import { Op } from 'sequelize';
import Driver from '../models/driver';

export const registerDriver = async (ctx: Context) => {
  const { name, email, phone, password } = ctx.request.body as {
    name: string;
    email: string;
    phone: string;
    password: string;
  };

  if (!name || !email || !phone || !password) {
    ctx.status = 400;
    ctx.body = { error: 'All fields are required.' };
    return;
  }
  if (password.length < 8) {
    ctx.status = 400;
    ctx.body = { error: 'Password must be at least 8 characters.' };
    return;
  }

  try {
    const existingDriver = await Driver.findOne({
      where: { [Op.or]: [{ email }, { phone }] }
    });
    if (existingDriver) {
      ctx.status = 409;
      ctx.body = { error: 'Email or phone number already registered.' };
      return;
    }

    const newDriver = await Driver.create({ name, email, phone, password });
    ctx.status = 201;
    ctx.body = { message: 'Driver registered successfully.', driverId: newDriver.dataValues.id };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Server error. Please try again later.' };
  }
};

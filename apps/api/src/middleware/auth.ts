import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import Driver from '../models/driver';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

export const authenticateToken = async (ctx: Context, next: Next) => {
  const token = ctx.headers['authorization']?.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Access token required.' };
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { driverId: number };
    const driver = await Driver.findByPk(decoded.driverId);
    if (!driver) {
      ctx.status = 403;
      ctx.body = { error: 'Invalid access token.' };
      return;
    }
    ctx.state.driver = driver;
    await next();
  } catch (error) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid or expired access token.' };
  }
};

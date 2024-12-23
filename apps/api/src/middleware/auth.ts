import logger from '@/utils/logger';
import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { Driver, Rider } from '../models';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';

export const authenticateToken = async (ctx: Context, next: Next) => {
  logger.info('Authenticating token...' + ctx.headers['authorization']);
  const token = ctx.headers['authorization']?.split(' ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Access token required.' };
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: string;
      userType: 'driver' | 'rider';
    };

    let user = null;
    console.info(decoded.userType);
    if (decoded.userType === 'driver') {
      user = await Driver.findByPk(decoded.userId);
    } else if (decoded.userType === 'rider') {
      user = await Rider.findByPk(decoded.userId);
    }

    console.info(user);

    if (!user) {
      ctx.status = 403;
      ctx.body = { error: 'Invalid access token.' };
      return;
    }

    ctx.state.user = user;
    ctx.state.userType = decoded.userType;
    await next();
  } catch (error) {
    logger.info('Error authenticating token: ' + error);
    ctx.status = 403;
    ctx.body = { error: 'Invalid or expired access token.' };
  }
};

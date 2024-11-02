import { Context } from 'koa';
import Driver from '../models/driver';
import { generateAccessToken } from '../utils/token-utils';

export const refreshAccessToken = async (ctx: Context) => {
  const { refreshToken } = ctx.request.body as any;
  if (!refreshToken) {
    ctx.status = 400;
    ctx.body = { error: 'Refresh token is required.' };
    return;
  }

  const driver = await Driver.findOne({ where: { refreshToken } });
  if (!driver) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid refresh token.' };
    return;
  }

  const accessToken = generateAccessToken(driver.dataValues.id);
  ctx.status = 200;
  ctx.body = { accessToken };
};

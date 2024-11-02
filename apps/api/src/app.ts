import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import sequelize from './config/database';
import driverRoutes from './routes';
import logger from './utils/logger';

const app = new Koa();

sequelize.sync().then(() => logger.info('Connected to PostgreSQL'));

app.use(bodyParser());

// TODO: remove this route
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = 'Server is up!';
  } else {
    logger.info('Request received:', ctx.method, ctx.path);
    await next();
  }
});

app.use(driverRoutes.routes()).use(driverRoutes.allowedMethods());

export default app;

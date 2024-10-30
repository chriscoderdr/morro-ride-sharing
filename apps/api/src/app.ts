import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import sequelize from './config/database';
import driverRoutes from './routes';

const app = new Koa();

sequelize.sync().then(() => console.log("Connected to PostgreSQL"));

app.use(bodyParser());

// Temporary test route
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = 'Server is up!';
  } else {
    console.log('Request received:', ctx.method, ctx.path);
    await next();
  }
});

app.use(driverRoutes.routes()).use(driverRoutes.allowedMethods());

export default app;

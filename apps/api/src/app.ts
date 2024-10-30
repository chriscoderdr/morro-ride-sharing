import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import sequelize from './config/database';
import driverRoutes from './routes/driver-routes';

const app = new Koa();

sequelize.sync().then(() => console.log("Connected to PostgreSQL"));

app.use(bodyParser());
app.use(driverRoutes.routes()).use(driverRoutes.allowedMethods());

export default app;

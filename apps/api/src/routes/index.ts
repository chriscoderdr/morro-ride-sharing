import Router from '@koa/router';
import driverRoutes from './driver-routes';

const router = new Router();

router.use('/drivers', driverRoutes.routes(), driverRoutes.allowedMethods());

export default router;

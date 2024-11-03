import Router from '@koa/router';
import driverRoutes from './driver-routes';
import riderRoutes from './rider-routes';

const router = new Router();

router.use('/drivers', driverRoutes.routes(), driverRoutes.allowedMethods());

router.use('/riders', riderRoutes.routes(), riderRoutes.allowedMethods());

export default router;

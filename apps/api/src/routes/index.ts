import Router from '@koa/router';
import riderRoutes from './rider-routes';

const router = new Router();

router.use('/drivers', riderRoutes.routes(), riderRoutes.allowedMethods());

router.use('/riders', riderRoutes.routes(), riderRoutes.allowedMethods());

export default router;

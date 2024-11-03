import {
    createRideRequest,
    registerRider
} from '@/controllers/rider-controller';
import { authenticateToken } from '@/middleware/auth';
import Router from '@koa/router';

const router = new Router();

router.post('/register', registerRider);
router.post('/createRideRequest', authenticateToken, createRideRequest);

export default router;

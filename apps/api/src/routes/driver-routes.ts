import { authenticateToken } from '@/middleware/auth';
import Router from '@koa/router';
import {
    acceptRideRequest,
    loginDriver,
    registerDriver,
    startRideRequest
} from '../controllers/driver-controller';

const router = new Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);
router.post('/acceptRequest', authenticateToken, acceptRideRequest);
router.post('/startRequest', authenticateToken, startRideRequest);

export default router;

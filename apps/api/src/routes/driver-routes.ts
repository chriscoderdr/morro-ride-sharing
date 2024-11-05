import { authenticateToken } from '@/middleware/auth';
import Router from '@koa/router';
import {
    acceptRideRequest,
    completeRideRequest,
    getRideRequests,
    loginDriver,
    pickUpRideRequest,
    registerDriver,
    startRideRequest
} from '../controllers/driver-controller';

const router = new Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);
router.post('/acceptRequest', authenticateToken, acceptRideRequest);
router.post('/startRequest', authenticateToken, startRideRequest);
router.post('/pickUpRequest', authenticateToken, pickUpRideRequest);
router.post('/completeRequest', authenticateToken, completeRideRequest);
router.get('/rideRequests', authenticateToken, getRideRequests);

export default router;

import {
  createRideRequest,
  estimateRide,
  login,
  registerRider,
  getCurrentRideRequest
} from '@/controllers/rider-controller';
import { authenticateToken } from '@/middleware/auth';
import Router from '@koa/router';

const router = new Router();

router.post('/register', registerRider);
router.post('/login', login);
router.post('/createRideRequest', authenticateToken, createRideRequest);
router.post('/estimateRide', authenticateToken, estimateRide);
router.get('/currentRide', authenticateToken, getCurrentRideRequest);

export default router;

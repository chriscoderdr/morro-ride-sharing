import Router from '@koa/router';
import { loginDriver, registerDriver } from '../controllers/driver-controller';

const router = new Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);

export default router;

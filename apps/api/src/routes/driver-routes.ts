import Router from "@koa/router";
import { registerDriver } from "../controllers/driver-controller";

const router = new Router();
router.post("/drivers/register", registerDriver);

export default router;

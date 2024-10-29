import Router from "@koa/router";
import Koa from "koa";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx: { body: string; }) => {
  ctx.body = "Hello, world dasdad!";
});

app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

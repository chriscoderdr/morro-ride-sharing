import app from './app';

const PORT = process.env.PORT || 3000;
// Temporary test route
app.use(async (ctx, next) => {
  if (ctx.path === '/') {
    ctx.body = 'Server is up!';
  } else {
    console.log('Request received:', ctx.method, ctx.path);
    await next();
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

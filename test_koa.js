const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    if (ctx.url === '/') ctx.body = 'Hello World!';
});

app.listen(5000);
'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = new Koa();
const router = new Router();

let times = [];

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    ctx.res.on('finish', async () => {
        const time = perfy.end('get-time').fullMilliseconds;
        await times.push(time);
    });
});

router.get('/api/hello', async (ctx) => {
    ctx.body = 'Hello World!';
    ctx.response.status = 200;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(5000, () => console.log(`Koa listens on 5000...`));

process.on('SIGINT', async () => {
    await logger('koa_hello', 'get', times);
    process.exit(1);
});
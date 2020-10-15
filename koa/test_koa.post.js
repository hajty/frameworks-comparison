'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

let data = [], times = [];

(async () => {
    await app.listen(5000);
    console.log(`Koa listens on 5000...`);
})();

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    ctx.res.on('finish', async () => {
        const time = perfy.end('get-time').fullMilliseconds;
        await times.push(time);
    });
});

router.post('/api/posts', async (ctx) => {
    await data.push(ctx.request.body.post);
    ctx.response.status = 201;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

process.on('SIGINT', async () => {
    await logger('koa', 'post', times);
    process.exit(1);
});
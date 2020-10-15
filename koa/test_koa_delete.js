'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');
const logger = require('../functions/logger.js');

const app = new Koa();
const router = new Router();

let data, times = [];

(async () => {
    data = await dataController.load(10000);
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

router.delete('/api/posts/:id', async (ctx) => {
    const id = ctx.params.id;
    await data.splice(id - 1, 1);
    ctx.response.status = 204;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

process.on('SIGINT', async () => {
    await logger('koa', 'delete', times);
    process.exit(1);
});
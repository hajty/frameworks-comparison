'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = new Koa();
app.use(bodyParser());

let data = [], times = [];

(async () => {
    await app.listen(5000);
    console.log(`Koa listens on 5000...`);
})();

const posts = async (ctx) => {
    await data.push(ctx.request.body.post);
    ctx.response.status = 201;
};

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

app.use(route.post('/api/posts', posts));

process.on('SIGINT', async () => {
    await logger('koa', 'post', times);
    process.exit(1);
});
'use strict';

const Koa = require('koa');
const route = require('koa-route');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = new Koa();

let times = [];

const helloString = (ctx) => {
    ctx.body = 'Hello World!';
};

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

app.use(route.get('/api/hello', helloString));

app.listen(5000, () => console.log(`Koa listens on 5000...`));

process.on('SIGINT', async () => {
    await logger('koa_hello', 'get', times);
    process.exit(1);
});
'use strict';

const Koa = require('koa');
const route = require('koa-route');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');

const app = new Koa();

let data, counter = 0;

(async () => {
    data = await dataController.load(1);
    await app.listen(5000);
    console.log(`Koa listens on 5000...`);
})();

const posts = (ctx) => {
    ctx.body = data;
};

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

app.use(route.get('/api/posts', posts));
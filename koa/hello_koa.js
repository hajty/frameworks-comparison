'use strict';

const Koa = require('koa');
const route = require('koa-route');
const perfy = require('perfy');

const app = new Koa();

let counter = 0;

const helloString = (ctx) => {
    ctx.body = 'Hello World!';
};

app.use(async (ctx, next) => {
    perfy.start('get-time');
    await next();
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

app.use(route.get('/api/posts', helloString));

app.listen(5000, () => console.log(`Koa listens on 5000...`));
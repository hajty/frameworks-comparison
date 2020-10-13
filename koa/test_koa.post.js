'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const route = require('koa-route');
const perfy = require('perfy');

const app = new Koa();
app.use(bodyParser());

let data = [], counter = 0;

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
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

app.use(route.post('/api/posts', posts));
'use strict';

const Koa = require('koa');
const route = require('koa-route');

const app = new Koa();

const helloString = (ctx) => {
    ctx.body = 'Hello World!';
};

app.use(route.get('/api/hello', helloString));

app.listen(5000, () => console.log(`Koa listens on 5000...`));
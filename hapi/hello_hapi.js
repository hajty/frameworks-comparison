'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

let times = [];

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/api/hello',
    handler: (request, h) => {
        perfy.start('get-time');
        return 'Hello World!';
    }
})

server.events.on('response', async () => {
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

server.start().then(() => console.log('Hapi listens on 4000...'));

process.on('SIGINT', async () => {
    await logger('express', 'get', times);
});
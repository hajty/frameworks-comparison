'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');
const logger = require('../_functions/logger.js');

let data = [], times = [];

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

(async () => {
    await server.start();
    console.log('Hapi listens on 4000...')
})();

server.route({
    method: 'POST',
    path: '/api/posts',
    handler: async (request, h) => {
        perfy.start('get-time');
        await data.push(request.payload.post);
        const response = h.response();
        response.statusCode = 201;
        return response;
    }
})

server.events.on('response', async() => {
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

process.on('SIGINT', async () => {
    await logger('hapi', 'post', times);
    process.exit(1);
});
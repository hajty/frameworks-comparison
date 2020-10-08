'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');

let data = [], counter = 0;

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
        await data.push(request.post);
        const response = h.response();
        response.statusCode = 201;
        return response;
    }
})

server.events.on('response', () => {
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
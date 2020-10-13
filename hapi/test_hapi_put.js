'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');

let data, counter = 0;

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

(async () => {
    data = await dataController.load(10000);
    await server.start();
    console.log('Hapi listens on 4000...')
})();

server.route({
    method: 'PUT',
    path: '/api/posts/{id}',
    handler: async (request, h) => {
        perfy.start('get-time');
        const id = request.params.id;
        data[id - 1] = await request.payload.post;
        const response = h.response();
        response.statusCode = 204;
        return response;
    }
})

server.events.on('response', () => {
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
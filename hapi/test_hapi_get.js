'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');
const logger = require('../functions/logger.js');

let data, times = [];

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
    method: 'GET',
    path: '/api/posts',
    handler: (request, h) => {
        perfy.start('get-time');
        return data;
    }
})

server.events.on('response', async () => {
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

process.on('SIGINT', async () => {
    await logger('express', 'get', times);
});
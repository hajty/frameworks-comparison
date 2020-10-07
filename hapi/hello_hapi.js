'use strict';

const Hapi = require('@hapi/hapi');
const perfy = require('perfy');

let counter = 0;

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

server.events.on('response', () => {
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

server.start().then(() => console.log('Hapi listens on 4000...'));
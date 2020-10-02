'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello World!';
    }
})

server.start().then(console.log('Listening on 4000'));
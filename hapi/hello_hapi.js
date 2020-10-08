'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/api/hello',
    handler: (request, h) => {
        return 'Hello World!';
    }
})

server.start().then(() => console.log('Hapi listens on 4000...'));
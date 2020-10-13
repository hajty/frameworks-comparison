'use strict';

const express = require('express');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = express();
let times = [];

app.get('/api/hello', async (req, res) => {
    perfy.start('get-time');
    await res.send('Hello World!');
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

app.listen(3000, () => console.log('Express listens on 3000...'));

process.on('SIGINT', async () => {
    await logger('express', 'get', times);
});
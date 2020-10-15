'use strict';

const express = require('express');
const perfy = require('perfy');
const logger = require('../functions/logger.js');

const app = express();
app.use(express.json());

let data = [], times = [];

(async () => {
    await app.listen(3000);
    console.log('Express listens on 3000...');
})();

app.post('/api/posts', async (req, res) => {
    perfy.start('get-time');
    await data.push(req.body.post);
    await res.sendStatus(201);
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

process.on('SIGINT', async () => {
    await logger('express', 'post', times);
    process.exit(1);
});
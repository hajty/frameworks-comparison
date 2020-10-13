'use strict';

const express = require('express');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');
const logger = require('../functions/logger.js');

const app = express();
app.use(express.json());

let data, times = [];

(async () => {
    data = await dataController.load(10000);
    await app.listen(3000);
    console.log('Express listens on 3000...');
})();

app.delete('/api/posts/:id', async (req, res) => {
    perfy.start('get-time');
    const id = req.params.id;
    await data.splice(id - 1, 1);
    await res.sendStatus(204);
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

process.on('SIGINT', async () => {
    await logger('express', 'get', times);
});
'use strict';

const express = require('express');
const perfy = require('perfy');
const dataController = require('../_functions/data_controller.js');
const logger = require('../_functions/logger.js');

const app = express();
app.use(express.json());

let data, times = [];

(async () => {
   data = await dataController.load(10000);
   await app.listen(3000);
   console.log('Express listens on 3000...');
})();

app.get('/api/posts', async (req, res) => {
    perfy.start('get-time');
    await res.send(data);
    const time = perfy.end('get-time').fullMilliseconds;
    await times.push(time);
});

process.on('SIGINT', async () => {
    await logger('express', 'get', times);
    process.exit(1);
});
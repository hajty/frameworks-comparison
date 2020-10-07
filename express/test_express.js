'use strict';

const express = require('express');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');

const app = express();
app.use(express.json());

let data, counter = 0;

(async () => {
   data = await dataController.load(1);
   await app.listen(3000);
   console.log('Express listens on 3000...')
})();

app.get('/api/posts', async (req, res) => {
    perfy.start('get-time');
    res.send(data);
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
'use strict';

const express = require('express');
const perfy = require('perfy');
const dataController = require('../functions/data_controller.js');

const app = express();
app.use(express.json());

let data, counter = 0;

(async () => {
    data = await dataController.load(10000);
    await app.listen(3000);
    console.log('Express listens on 3000...')
    console.log(data[10]);
})();

app.put('/api/posts/:id', async (req, res) => {
    perfy.start('get-time');
    const id = req.params.id;
    data[id - 1] = await req.body.post;
    res.sendStatus(204);
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
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
    console.log('Express listens on 3000...');
})();

app.delete('/api/posts/:id', async (req, res) => {
    perfy.start('get-time');
    const id = req.params.id;
    await data.splice(id - 1, 1);
    res.sendStatus(204);
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
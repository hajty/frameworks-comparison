'use strict';

const express = require('express');
const perfy = require('perfy');

const app = express();
app.use(express.json());

let data = [], counter = 0;

(async () => {
    await app.listen(3000);
    console.log('Express listens on 3000...')
})();

app.post('/api/posts', async (req, res) => {
    perfy.start('get-time');
    await data.push(req.body.post);
    res.sendStatus(201);
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});
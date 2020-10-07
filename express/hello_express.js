'use strict';

const express = require('express');
const perfy = require('perfy');

const app = express();
app.use(express.json());

let counter = 0;

app.get('/api/hello', async (req, res) => {
    perfy.start('get-time');
    res.send('Hello World!');
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

app.listen(3000, () => console.log('Express listens on 3000...'));
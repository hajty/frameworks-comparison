const express = require('express');
const perfy = require('perfy');
const dataController = require('./functions/data_controller.js');

const app = express();
app.use(express.json());

let data, counter = 0;
dataController.load(10000).then((result) => data = result);

app.get('/', async (req, res) => {
    res.send('Chujowa jesteś jak barszcz w tego Apexa.');
});

app.get('/api/posts', async (req, res) => {
    perfy.start('get-time');
    res.send(data);
    console.log(`${++counter} GET response time: ${perfy.end('get-time').fullMilliseconds} milliseconds.`);
});

app.listen(3000, () => console.log('Listening on 3000...'));
'use strict';

const express = require('express');

const app = express();

app.get('/api/hello', async (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log('Express listens on 3000...'));
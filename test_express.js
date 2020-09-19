const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    await
    res.send('Hello World!');
});

app.listen(3000, () => console.log('Listening on 3000...'));
//
//
const express = require('express');

// App 1: Serves at port 3000
const app1 = express();
const port1 = 3000;

app1.get('/', (req, res) => {
    res.send('Hello, this is geetha.com!');
});

app1.listen(port1, () => {
    console.log(`App1 listening at http://localhost:${port1}`);
});


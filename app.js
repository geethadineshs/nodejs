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

// App 2: Serves at port 3001
const app2 = express();
const port2 = 3001;

app2.get('/node', (req, res) => {
    res.send('Hello from /node route!');
});

app2.listen(port2, () => {
    console.log(`App2 listening at http://localhost:${port2}`);
});

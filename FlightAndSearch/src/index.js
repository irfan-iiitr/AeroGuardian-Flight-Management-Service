const express = require('express');
const app = express();
const {port}= require('../src/config/serverConfig');
const {City} = require('../src/models/index');

const ApiRoutes=require('./routes/index');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',ApiRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

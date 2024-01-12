const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes/index');
// const CRON = require('./utils/common/cron-jobs');

const app = express();
const db= require('./models/index');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/bookingservice/api', apiRoutes);
// app.use('/bookingService/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // CRON();
    // await Queue.connectQueue();
    // console.log("queue connected")

    if(process.env.DB_SYNC){
        db.sequelize.sync({
            alter: true,
        })
    }
});
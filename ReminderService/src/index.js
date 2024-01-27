const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');

const TicketController = require('./controller/ticket-controller');
const jobs=require('./utils/job');

const {subscribeEvents}= require('./services/email-service');

const {subscribeMessage,createChannel}= require('./utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('./config/serverConfig');

const setupAndStartServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
    // jobs();

    // sendBasicEmail(
    //     'support@gabbar.com',
    //     'imirfansari@gmail.com',
    //     'Test Email',
    //     'Hello World'
    // )

    const channel= await createChannel();

    subscribeMessage(channel,subscribeEvents,REMINDER_BINDING_KEY);
}

setupAndStartServer();
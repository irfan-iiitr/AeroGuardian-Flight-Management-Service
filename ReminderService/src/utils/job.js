const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');

/**
 * 10:00 am 
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent 
 * by now  and is pending
 */

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        console.log('2mins');
        const response = await emailService.fetchPendingMails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "Sent"});
                }
            });
        });
        console.log(response);
    });    
}

module.exports = setupJobs;
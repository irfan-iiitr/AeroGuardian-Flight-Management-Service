const {StatusCodes}= require('http-status-codes');
const {BookingService}= require('../services/index');

const bookingService = new BookingService();
const {createChannel, publishMessage}= require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}= require('../config/server-config');


class BookingController {
        
    constructor() {
       
    }

    async sendMessageToQueue(req,res){
        const channel= await createChannel();
        const payload={
            data:{
                subject: 'This is a notification from the booking service queue',
                content:'Some queue will suscribe this',
                recepientEmail:'cs@gmail.com',
                notificationTime:'2023-01-08 09:49:00'
            }, 
         service:"CREATE_TICKET"
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message: "Successfully sent message to queue",
        })
    }
      
            async create (req, res)  {
                try{
                    // console.log(bookingService.createBooking);
                        const response= await bookingService.createBooking(req.body);
                        return res.status(200).json({
                            message: 'Successfully completed booking',
                            success:true,
                            err:{},
                            data: response
                        })
                }
                catch(err){
                    console.log(err,"error from controller");
                return  res.status(400).json({
                        message: err.message,
                        success:false,
                        err:err.explanation,
                        data: {}
                    })
                }
            }


}




module.exports = BookingController;
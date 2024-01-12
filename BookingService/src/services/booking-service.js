const axios=require('axios');

const {FLIGHT_SERVICE} = require('../config/server-config');
const {BookingRepository} = require('../repository/index');
const {ServiceError} = require('../utils/errors');

class BookingService{
    constructor(){
        this.bookingRepository  = new BookingRepository();
    }

    async createBooking(data){
        try{
            console.log("hi");
            const flightId=data.flightId;
            const getFlightRequestURL=`${FLIGHT_SERVICE}/api/v1/flights/${flightId}`;
            console.log(getFlightRequestURL);
            const flight=await axios.get(getFlightRequestURL);
            console.log(flight.data);
            const flightData=flight.data.data;
            let priceOfFlight=flightData.price;
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceError(('Something went wrong in the booking process','Insufficient Seats'));
            }
            const totalCost=priceOfFlight*data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);

            const updateFlightRequestURL=`${FLIGHT_SERVICE}/api/v1/flights/${booking.flightId}`;
            console.log("UpdateFlightRequestURL", updateFlightRequestURL)
            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-data.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id,{status:'Booked'});

            return finalBooking;
        }
        catch(error){  
            if(error.name=='RepositoryError' || error.name=='BookingError'){
                throw error;
            }
            throw  new ServiceError();
        }
    }
}

module.exports =BookingService;
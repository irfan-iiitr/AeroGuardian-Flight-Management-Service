const {FlightsRepository,AirplaneRepository}= require('../repository/index');
const {compareTime}= require('../utils/helper');

class flightService{

    constructor(){
        this.airplaneRepository=new AirplaneRepository();
        this.flightRepository=new FlightsRepository();
    }

    async createFlight(data){
        try{
            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw {error: 'Arrival time should be greater than departure time'};
            }
            const airplane=await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight= await this.flightRepository.createFlight({...data,totalSeats:airplane.capacity});

            return flight;
        }
        catch(err){
            console.log("something went wrong in FlightService.createFlight");
            throw {err};
        }
    }

    async getAllFlights(data) {
        try{
            const flights= await this.flightRepository.getAllFlights(data);
            return flights;
        }
        catch(err){
            console.log("something went wrong in FlightService.getAllFlights");
            throw {err};
        }
    }

    async getFlight(flightId) {
        try{
            const flight= await this.flightRepository.getFlight(flightId);
            return flight;
        }
        catch(err){
            console.log("something went wrong in FlightService.getFlight");
            throw {err};
        }
    }

    async updateFlight(flightId, data) {
        try {
            const response = await this.flightRepository.updateFlights(flightId, data);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer");
            throw {error};
        }
    }
}


module.exports = flightService;
const {Flights} = require('../models/index');
const {Op}= require('sequelize');

class FlightRepository {

    #createFilter(data){
        let filter={};
        if(data?.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data?.departureAirportid){
            filter.departureAirportId = data.departureAirportId;
        }
        // if(data?.minPrice && data?.maxPrice){
        //     Object.assign(filter,
        //          {[Op.and]:[
        //             {price:{[Op.lte]:data.maxPrice}},
        //             {price:{[Op.gte]:data.minPrice}}
        //         ]
                
        //         })
        // }
        // else{
        //     if(data?.minPrice){
        //         Object.assign(filter, {price:{[Op.gte]: data.minPrice}});
        //     }
        //     if(data?.maxPrice){
        //         Object.assign(filter, {price:{[Op.lte]: data.maxPrice}});
        //     }
        // }
        let pricefilter=[];


        if(data?.minPrice){
           // Object.assign(filter, {price:{[Op.gte]: data.minPrice}});
           pricefilter.push({price:{[Op.gte]: data.minPrice}});
        }
        if(data?.maxPrice){
            //Object.assign(filter, {price:{[Op.lte]: data.maxPrice}});
            pricefilter.push({price:{[Op.lte]: data.maxPrice}});
        }
        if(pricefilter.length>0){
            Object.assign(filter, {[Op.and]:pricefilter});
        }
        //Object.assign(filter, {[Op.and]:[{price:{[Op.lte]:7000}},{price:{[Op.gte]:3000}}]})


        console.log(filter);
        return filter;

    }

    async createFlight(data){
            
            try{
                const flight= await Flights.create(data);
                return flight;
            }
            catch(err){
                console.log("something went wrong in FlightRepository.createFlight");
                throw {err};
            }
    }


    async getFlight(id){
        try{
            const flight= await Flights.findByPk(id);
            return flight;
        }
        catch(err){
            console.log("something went wrong in FlightRepository.getFlight");
            throw {err};
        }
    }

    async getAllFlights(filter){
        try{
           const filterObject=this.#createFilter(filter);
           console.log(filterObject);
              const flights= await Flights.findAll({
                    where:filterObject
                });

           // const flights= await Flights.findAll();
            return flights;
        }
        catch(err){
            console.log(err,"error in FlightsRepository.getAllFlights");
            throw {err};
        }
    }

    async updateFlights(flightId, data) {
        try {
           await Flights.update(data, {
               where: {
                   id: flightId
               }
           });
           return true;
       } catch (error) {
           console.log("Something went wrong in the repository layer");
           throw {error};
       }
   }



    
}


module.exports = FlightRepository;
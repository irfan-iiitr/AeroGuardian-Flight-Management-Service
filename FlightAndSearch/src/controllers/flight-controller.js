const {flightService}=require('../services/index')
const FlightService=new flightService();
const {ClientErroCodes,SuccessCodes}= require('../utils/error-codes');

const create =async(req,res)=>{
    try{
        const flightRequestData = {
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price
        }
        const flight=await FlightService.createFlight(flightRequestData);
        return res.status(SuccessCodes.CREATED).json({
            data:flight,
            success:true,
            message:'Flight created successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in flightController.create", err);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Flight creation failed',
            err:err
        })
    }
}


const getAll = async(req,res)=>{
    try{
        const flights=await FlightService.getAllFlights(req.query);
        return res.status(SuccessCodes.OK).json({
            data:flights,
            success:true,
            message:'Flights fetched successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in flightController.getAll", err);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Flights fetch failed',
            err:err
        })
    }

    

}

const get=async(req, res)=>{
    try{
        const flight=await FlightService.getFlight(req.params.id);
        return res.status(SuccessCodes.OK).json({
            data:flight,
            success:true,
            message:'Flight fetched successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in flightController.get", err);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Flight fetch failed',
            err:err
        })
    }
}

const update = async (req, res) => {
    try {
        const response = await FlightService.updateFlight(req.params.id, req.body);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            err: {},
            message: 'Successfully updated the flight'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update the flight',
            err: error
        });
    }
}


module.exports= {
    create,
    getAll,
    get,
    update,

}
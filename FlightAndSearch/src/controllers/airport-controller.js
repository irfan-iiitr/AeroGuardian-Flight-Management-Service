const {AirportService}= require('../services/index');

const airportService =new AirportService();

const create= async(req,res)=>{
    try{
        const airport=await airportService.create(req.body);
        return res.status(201).json({
            data:airport,
            success:true,
            message:'Airport created successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in airportController.create", err);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Airport creation failed',
            err:err
        })
    }
}

module.exports={
    create
}
const {cityService} = require('../services/index');

const CityService = new cityService();

const create = async(req,res)=>{
    
    try{
            const city = await CityService.createCity(req.body);
            return res.status(201).json({
                data:city,
                success:true,
                message: 'City created successfully',
                err:{}
            })
    }
    catch(err){
        console.log("something went wrong in cityController.create");
        return res.status(500).json({
            data:{},
            success:false,
            message: 'City creation failed',
            err:err
        })
    }   
}



const destroy = async(req,res)=>{
    try{
        const cityId = req.params.id;
        const response = await CityService.deleteCity(cityId);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'City deleted successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in cityController.destroy");
        return res.status(500).json({
            data:{},
            success:false,
            message: 'City deletion failed',
            err:err
        })
    }
}

const get = async(req,res) =>{
    try{
        const cityId = req.params.id;
        const city = await CityService.getCity(cityId);
        return res.status(200).json({
            data:city,
            success:true,
            message: 'City fetched successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in cityController.get");
        return res.status(500).json({
            data:{},
            success:false,
            message: 'City fetch failed',
            err:err
        })
    }
}


const update = async (req, res) => {
    try{
        const cityId = req.params.id;
        const city = await CityService.updateCity(cityId, req.body);
        return res.status(200).json({
            data:city,
            success:true,
            message: 'City updated successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in cityController.update");
        return res.status(500).json({
            data:{},
            success:false,
            message: 'City updation failed',
            err:err
        })
    }
}
const getAll =async(req,res)=>{
    try{
        const cities = await CityService.getAllCities(req.query);
        return res.status(200).json({
            data:cities,
            success:true,
            message: 'Cities fetched successfully',
            err:{}
        })
    }
    catch(err){
        console.log("something went wrong in cityController.getAll");
        return res.status(500).json({
            data:{},
            success:false,
            message: 'Cities fetch failed',
            err:err
        })
    }

}


module.exports = {
    create,
    destroy,
    get,
    update,
    getAll,
}
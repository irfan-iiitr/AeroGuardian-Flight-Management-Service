const {City} = require('../models/index');
const {Op}=require('sequelize');

class CityRepository {

    async createCity({name}) {

        try{
            const city= await City.create({name});
            return city;
        }
        catch(err){
            console.log("something went wrong in CityRepository.createCity");
            throw {err};
        }
    }


    async getAllCities(filter) {
        try{
            if(filter.name){
                const cities= await City.findAll({where:
                    {
                        name:{
                            [Op.startsWith]:filter.name
                        }
                    }
                });
                return cities;
            }
            const cities= await City.findAll();
            return cities;
        }
        catch(err){
            console.log(err);
            throw {err};
        }
    }


    async deleteCity(cityId){
        try{
            await City.destroy({where:{id:cityId}});
            return true;
        }
        catch(err){
            console.log("something went wrong in CityRepository.deleteCity");
            throw {err};
        }
    }

    async getCity(cityId){
        try{
               const city= await City.findByPk(cityId);  //pk-primary key
               return city;
        }
        catch(err){
            console.log("something went wrong in CityRepository.getCity");
            throw {err};
        }
    }

    async updateCity(cityId, data){
        try{
            const city= await City.findByPk(cityId); 
            city.name=data.name;
            await city.save();
            return city;
        }
        catch(err){
            console.log("something went wrong in CityRepository.updateCity");
            throw {err};
        }
    }
}

module.exports = CityRepository;
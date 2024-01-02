const {CityRepository}=require('../repository/index');

class cityService {

    constructor(){
        this.cityRepository = new CityRepository();
    }

    async createCity(data){
        try{
            const city= await this.cityRepository.createCity(data);
            return city;
        }
        catch(err){
            console.log("something went wrong in cityService.createCity");
            throw {err};
        }
    }

    async deleteCity(cityId){
        try{
            const response= await this.cityRepository.deleteCity(cityId);
            return response;
        }
        catch(err){
            console.log("something went wrong in cityService.deleteCity");
            throw {err};
        }
    }

    async updateCity(cityId, data){
        try{
            const city= await this.cityRepository.updateCity(cityId, data);
            return city;
        }
        catch(err){
            console.log("something went wrong in cityService.updateCity");
            throw {err};
        }
    }

    async getCity(cityId){
        try{
            const city= await this.cityRepository.getCity(cityId);
            return city;
        }
        catch(err){
            console.log("something went wrong in cityService.getCity");
            throw {err};
        }
    }

    async getAllCities(filter){
        try{
            const cities= await this.cityRepository.getAllCities({name:filter.name});
            return cities;
        }
        catch(err){
            console.log("something went wrong in cityService.getAllCities");
            throw {err};
        }
    }
}

module.exports = cityService;
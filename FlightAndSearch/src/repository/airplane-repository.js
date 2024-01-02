const {Airplane} = require('../models/index');

class AirplaneRepository{


    async getAirplane(id){
        try{
            //console.log('id: ' + id);
               const airplane= await Airplane.findByPk(id);  //pk-primary key
               return airplane;
        }
        catch(err){
            console.log("something went wrong in AirplaneRepository.getAirplane");
            throw {err};
        }
    }
}

module.exports = AirplaneRepository
const CrudRepository = require('../repository/crud-repository');
const {City,Flight,Airport}=require('../models/index');


class AirportRepository extends CrudRepository{

    constructor(){
        super(Airport);
    }


}

module.exports = AirportRepository;
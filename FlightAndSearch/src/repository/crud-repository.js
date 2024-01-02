
class CrudRepository{

    constructor(model){
        this.model = model;
    }

    async create(data){
        try{
            const response= await this.model.create(data);
            return response;
        }
        catch(err){
            console.log("something went wrong in CrudRepository.create");
            throw {err};
        }
    }


    async destroy(modelId){
        try{
             await this.model.destroy({
                where: {
                    id: modelId
                }
            
            });
            return true;
        }
        catch(err){
            console.log("something went wrong in CrudRepository.destroy");
            throw {err};
        }
    }

    async get(modelId){
        try{
            const response= await this.model.findByPk(modelId);
            return response;
        }
        catch(err){
            console.log("something went wrong in CrudRepository.get");
            throw {err};
        }
    }

    async getAll(){
        try{
            const response= await this.model.findAll();
            return response;
        }
        catch(err){
            console.log("something went wrong in CrudRepository.getAll");
            throw {err};
        }
    }

    async update(modelId, data){
        try{
            const response= await this.model.update(data,{
                where: {
                    id: modelId
                }
            });
            return response;
        }
        catch(err){
            console.log("something went wrong in CrudRepository.update");
            throw {err};
        }
    }
}


module.exports=CrudRepository;
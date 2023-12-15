

const MainModel = require(__path_schemas + 'items.schema');


module.exports = {
    create: async (item) =>{
         await new MainModel(item).save()
         return await MainModel.find({}).select(' task level')
    },
    listItem: async(params,option) =>{
        let sort={}
        let objWhere={}
        if(params.keyword!=='' && params.sortField) objWhere[params.sortField]=new RegExp(params.keyword,'i')
        if(params.sortField) sort[params.sortField]=params.sortType || 'asc'
        if(option.task=='all'){
            return await MainModel
                            .find(objWhere)
                            .sort(sort)
                            .select('task level')
        }
        else {
            return await MainModel
                            .findById(params.id)
                            .select('task level')
        }
    },
    deleteItem: async(params,option) =>{
        if (option.task=='one') {
           await MainModel.deleteOne({id:params.id})
            return await MainModel.find({}).select('task level')
        }
    },
    editItem: async (params,option) =>{
        if(option.task==='edit'){
             await MainModel.updateOne({id:params.id},params.body)
             return await MainModel
             .find({})
             .select('task level') 
        }
    }
}
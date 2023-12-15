const { Query } = require("mongoose");


const MainModel = require(__path_schemas + 'items.schema');


module.exports = {
    create: async (item) =>{
         await new MainModel(item).save()
         return await MainModel.find({})
    },
    listItem: async(query,option) =>{
        let select,sort,limit,skip
        let queryFind={...query}
        let removeFind=['select','sort','limit','page']
        
        removeFind.forEach(data =>{
            delete queryFind[data]
        })
        let queryStr=JSON.stringify(queryFind)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,find =>`$${find}`)
        queryFind=JSON.parse(queryStr)
        console.log(query)
        if (query.select) {
             select=query.select.split(',').join(' ')
        }
        if (query.sort) {
            sort=query.sort
       }
       if (query.limit && query.page) {
        limit=parseInt(query.limit) || 3
        skip =limit * parseInt(((query.page||1)-1)) 
   }
        if(option.task=='all'){
            return await MainModel
                            .find(queryFind)
                            .sort(sort)
                            .select(select)
                            .limit(limit)
                            .skip(skip)
        }
        else {
            return await MainModel
                            .findById(query.id)
                            .select('')
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

const categories_productModels = require(__path_models + 'categories_product')
module.exports = {
    listItems: (params, options = null)=>{
        let objWhere = {};
        let sort = {}
        sort[params.sortFied] = params.sortType
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
     return categories_productModels
            .find(objWhere)
            .sort(sort)
            .limit(params.pagination.totalItemsPerPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPerPage)
    },
    countItems: (params, options = null)=>{
      return  categories_productModels.count(params.objWhere)
    },
    changeStatus: (currentStatus,id, options = null)=>{
        let status = (currentStatus === 'active') ? 'inactive': 'active'
        let data = { 
          modify: {
            user_name: 'admin',
            user_id: 0
          }
        }
        if (options.task == 'changeStatus-multi') {
            data.status = currentStatus
            console.log(data)
           return categories_productModels.updateMany({_id:{$in:id}}, data)
        } 
        if (options.task == 'changeStatus-one') {
            data.status = status
            return categories_productModels.updateOne({_id: id}, data )
        }
      },
      changeOrdering: async (cids,oderings, options = null)=>{
        let data = {
            ordering:parseInt(oderings), 
            modify: {
              user_name: 'admin',
              user_id: 0
            }
          }
    
        if(Array.isArray(cids)){
            for (let index = 0; index < cids.length; index++) {
                data.ordering = parseInt(oderings[index])
                await categories_productModels.updateOne({_id: cids[index]}, data)
            }
            Promise.resolve("Success")
        }else{
         
         return categories_productModels.updateOne({_id: cids}, data)
        }
      },
      deleteItems: (id, options=null )=>{
        if (options.task == 'delete-multi') {
           return categories_productModels.deleteMany({_id:{$in:id}})
        } 
        if (options.task == 'delete-one') {
           return  categories_productModels.deleteOne({_id: id})
        }
 
      },
      getItems: (id, option = null)=>{
       return categories_productModels.findById(id)
      },

      saveItems: (item, options = null) =>{
        if (options.task == 'add') {
          delete item.id
            item.created = {
              user_name: 'admin',
              user_id: 0
            }
          return  new categories_productModels(item).save()
        } 
        if (options.task == 'edit') {
        return  categories_productModels.updateOne({_id: item.id},{
            name: item.name,
            ordering: parseInt(item.ordering),
            status: item.status,
            modify: {
              user_name: 'admin',
              user_id: 0
            }
          })
        }
      },
    changeGroup: (currentGroups,id, option=null)=>{
      let groups = (currentGroups === 'yes') ? 'no': 'yes'
      let data = {
        groups_acp: groups, 
        modify: {
          user_name: 'admin',
          user_id: 0
        }
      }
     return categories_productModels.updateOne({_id: id}, data )
    },
  getCategoryById: async (val) =>{
      let data = await categories_productModels.findOne({_id: val, status:'active'})
      return data
  },
  getCategoryList: async (status, sort = 'asc') =>{
    let data = await categories_productModels.find({status: status}).sort({ordering: sort })
    return data
},
}
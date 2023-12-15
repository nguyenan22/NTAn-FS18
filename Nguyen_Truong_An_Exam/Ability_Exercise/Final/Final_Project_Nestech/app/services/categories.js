
const categoriesModels = require(__path_models + 'categories')
module.exports = {
    listItems: (params, options = null)=>{
        let objWhere = {};
        let sort = {}
        sort[params.sortFied] = params.sortType
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
     return categoriesModels
            .find(objWhere)
            .sort(sort)
            .limit(params.pagination.totalItemsPerPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPerPage)
    },
    countItems: (params, options = null)=>{
      return  categoriesModels.count(params.objWhere)
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
           return categoriesModels.updateMany({_id:{$in:id}}, data)
        } 
        if (options.task == 'changeStatus-one') {
            data.status = status
            return categoriesModels.updateOne({_id: id}, data )
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
                await categoriesModels.updateOne({_id: cids[index]}, data)
            }
            Promise.resolve("Success")
        }else{
         
         return categoriesModels.updateOne({_id: cids}, data)
        }
      },
      deleteItems: (id, options=null )=>{
        if (options.task == 'delete-multi') {
           return categoriesModels.deleteMany({_id:{$in:id}})
        } 
        if (options.task == 'delete-one') {
           return  categoriesModels.deleteOne({_id: id})
        }
 
      },
      getItems: (id, option = null)=>{
       return categoriesModels.findById(id)
      },

      saveItems: (item, options = null) =>{
        if (options.task == 'add') {
          delete item.id
            item.created = {
              user_name: 'admin',
              user_id: 0
            }
          return  new categoriesModels(item).save()
        } 
        if (options.task == 'edit') {
        return  categoriesModels.updateOne({_id: item.id},{
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
     return categoriesModels.updateOne({_id: id}, data )
    }
}
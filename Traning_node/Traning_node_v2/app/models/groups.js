
const groupsService = require(__path_shemas + 'groups')
module.exports = {
    listItems: (params, options = null)=>{
        let objWhere = {};
        let sort = {}
        sort[params.sortFied] = params.sortType
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}

     return groupsService
            .find(objWhere)
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    countItems: (params, options = null)=>{
      return  groupsService.count(params.objWhere)
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
           return groupsService.updateMany({_id:{$in:id}}, data)
        } 
        if (options.task == 'changeStatus-one') {
            data.status = status
            return groupsService.updateOne({_id: id}, data )
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
                await groupsService.updateOne({_id: cids[index]}, data)
            }
            Promise.resolve("Success")
        }else{
         
         return groupsService.updateOne({_id: cids}, data)
        }
      },
      deleteItems: (id, options=null )=>{
        if (options.task == 'delete-multi') {
           return groupsService.deleteMany({_id:{$in:id}})
        } 
        if (options.task == 'delete-one') {
           return  groupsService.deleteOne({_id: id})
        }
 
      },
      getItems: (id, option = null)=>{
       return groupsService.findById(id)
      },

      saveItems: (item, options = null) =>{
        if (options.task == 'add') {
          delete item.id
            item.created = {
              user_name: 'admin',
              user_id: 0
            }
          return  new groupsService(item).save()
        } 
        if (options.task == 'edit') {
        return  groupsService.updateOne({_id: item.id},{
            name: item.name,
            ordering: parseInt(item.ordering),
            status: item.status,
            editorData:item.editorData,
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
     return groupsService.updateOne({_id: id}, data )
    }
}
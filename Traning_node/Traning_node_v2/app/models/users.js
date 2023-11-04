

const usersService = require(__path_shemas + 'users')
const groupsService = require(__path_shemas + 'groups')
const fs=require('fs')
const fileHelper=require('../helpers/file')

module.exports = {
    listItems: (params,option = null) => {
        let objWhere = {};
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
        let sort = {}
        sort[params.sortFied] = params.sortType
      return  usersService
            .find(objWhere)
            .select('fullName userName email status ordering group editorData created avatar')
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    getItems:(id,option = null) =>  {
      return usersService.findById(id)
    },
    getItemsUserName: async(username,option=null) => {
        return await usersService.find({status:'active',userName:username})
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return usersService.count(params.objWhere)
    },
    changeStatus:(id,currentStatus, option = null) =>  {
        let status = (currentStatus === 'active') ? 'inactive': 'active'
        let data = {
        //   status: status, 
          modify: {
            user_name: 'admin',
            user_id: 0
          }
        }
        if(option.task == 'update-one'){
            data.status = status
            return usersService.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return usersService.updateMany({_id:{$in:id}}, data)
        }
    
     },
     changeOrdering: async(cids,oderings, option = null) =>  {
        let data = {
            ordering: parseInt(oderings),
            modify: {
            user_name: 'admin',
            user_id: 0
            }
        }

        if (Array.isArray(cids)) {
           
            for(let index = 0; index < cids.length; index++){
                console.log(index);
                data.ordering = parseInt(oderings[index])
                await usersService.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return usersService.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await usersService.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/users/',item.avatar)
          })
          return usersService.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await usersService.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/users/',item.avatar)
              })
            }
          }
          else {
            await usersService.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/users/',item.avatar)
            })
          }
          return usersService.deleteMany({_id:{$in:id}})
    }},
    saveItems: (item, option = null)=>{
      
        if(option.task == 'add'){
          delete item.id
            item.created = {
                user_name: 'admin',
                user_id: 0
              }
              item.group = {
                id: item.group_id,
                name: item.group_name
              }

            return  new usersService(item).save()
          }
  
          if(option.task == 'edit'){
          return usersService.updateOne({_id: item.id},{
            userName: item.userName,
            fullName: item.fullName,
            ordering: parseInt(item.ordering),
            status: item.status,
            editorData: item.editorData,
            avatar : item.avatar,
            group: {
                id: item.group_id,
                name: item.group_name
              },
              modify: {
                user_name: 'admin',
                user_id: 0
              }
              })  
          }

         if(option.task == 'change-group-name'){
         
          return usersService.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return groupsService.find({},{id:1, name:1})
  } 
}


const usersModels = require(__path_models + 'users')
const groupsModels = require(__path_models + 'groups')
const fs=require('fs')
const fileHelper=require('../helpers/file')

module.exports = {
    listItems: (params,option = null) => {
        let objWhere = {};
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
        let sort = {}
        sort[params.sortFied] = params.sortType
      return  usersModels
            .find(objWhere)
            .select('fullName userName email status ordering group editorData created avatar modify')
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    getItems:(id,option = null) =>  {
      return usersModels.findById(id)
    },
    getItemsUserName: async(username,option=null) => {
        return await usersModels.find({status:'active',userName:username})
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return usersModels.count(params.objWhere)
    },
    changeStatus:(id,currentStatus, option = null,modify) =>  {
        let status = (currentStatus === 'active') ? 'inactive': 'active'
        let data = {
        //   status: status, 
          modify: {
            user_name: modify.userName,
            user_id: modify.id
          }
        }
        if(option.task == 'update-one'){
            data.status = status
            return usersModels.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return usersModels.updateMany({_id:{$in:id}}, data)
        }
    
     },
     changeOrdering: async(cids,oderings, option = null,modify) =>  {
        let data = {
            ordering: parseInt(oderings),
            modify: {
            user_name: modify.userName,
            user_id: modify.id
            }
        }

        if (Array.isArray(cids)) {
           
            for(let index = 0; index < cids.length; index++){
                console.log(index);
                data.ordering = parseInt(oderings[index])
                await usersModels.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return usersModels.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await usersModels.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/users/',item.avatar)
          })
          return usersModels.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await usersModels.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/users/',item.avatar)
              })
            }
          }
          else {
            await usersModels.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/users/',item.avatar)
            })
          }
          return usersModels.deleteMany({_id:{$in:id}})
    }},
    saveItems: (item, option = null,creater)=>{
      
        if(option.task == 'add'){
          delete item.id
            item.created = {
                user_name: creater.userName,
                user_id: creater.id
              }
              item.group = {
                id: item.group_id,
                name: item.group_name
              }

            return  new usersModels(item).save()
          }
  
          if(option.task == 'edit'){
          return usersModels.updateOne({_id: item.id},{
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
                user_name: creater.userName,
                user_id: creater.id
              }
              })  
          }

         if(option.task == 'change-group-name'){
         
          return usersModels.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return groupsModels.find({},{id:1, name:1})
  } 
}
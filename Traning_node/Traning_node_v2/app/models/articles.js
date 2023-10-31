

const articlesService = require(__path_shemas + 'articles')
const categoriesService = require(__path_shemas + 'categories')
const fs=require('fs')
const fileHelper=require('../helpers/file')

module.exports = {
    listItems: (params,option = null) => {
      console.log(params)
        let objWhere = {};
        if((params.categoryID !=='') && (params.categoryID !=='allvalue'))  {objWhere={categoryId:params.categoryID}}
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
        let sort = {}
        sort[params.sortFied] = params.sortType
      return  articlesService
            .find(objWhere)
            .select('title status ordering  editorData created thumb categoryId position slug')
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    listItemsFrontEnd :(params,option=null) =>{
      if(option.task=='special-item') {
        return articlesService
                .find({position:'Top-Post',status:'active'})
                .sort({ordering:'asc'})
                .limit(3)

      }
      if(option.task=='latest-item') {
        return articlesService
                .find({status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(5)

      }

      if(option.task=='mostPopular-item') {
        return articlesService
                .find({position:'Normal',status:'active'})
                .sort({ordering:'asc'})
                .limit(5)

      }
    },
    getItems:(id,option = null) =>  {
      return articlesService.findById(id)
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return articlesService.count(params.objWhere)
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
            return articlesService.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return articlesService.updateMany({_id:{$in:id}}, data)
        }
    
     },

     changeCategory:(id,categoryId, option = null) =>  {
      
      let data = {
        modify: {
          user_name: 'admin',
          user_id: 0
        }
      }
      if(option.task == 'update-one'){
          data.categoryId = categoryId
          return articlesService.updateOne({_id: id}, data )
      }
  
   },

     changePosition:(id,currentPosition, option = null) =>  {
      let position = (currentPosition === 'Top-Post') ? 'Normal': 'Top-Post'
      let data = {
      //   status: status, 
        modify: {
          user_name: 'admin',
          user_id: 0
        }
      }
      if(option.task == 'update-one'){
          data.position = position
          return articlesService.updateOne({_id: id}, data )
      }

      if(option.task == 'update-multi'){
          data.position = currentPosition
          return articlesService.updateMany({_id:{$in:id}}, data)
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
                await articlesService.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return articlesService.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await articlesService.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/articles/',item.thumb)
          })
          return articlesService.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await articlesService.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/articles/',item.thumb)
              })
            }
          }
          else {
            await articlesService.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/articles/',item.thumb)
            })
          }
          return articlesService.deleteMany({_id:{$in:id}})
    }},
    saveItems: async(item, option = null)=>{
      
        if(option.task == 'add'){
          delete item.id
            item.created = {
                user_name: 'admin',
                user_id: 0
              }
              await articlesService(item).save().then(async(room) =>{
                let articleArr=await categoriesService.findById({_id:room.categoryId})
                articleArr.articles.push(room)
                return await categoriesService(articleArr).save()
              })
          }
  
          if(option.task == 'edit'){
          return articlesService.updateOne({_id: item.id},{
            title: item.title,
            slug:item.slug,
            ordering: parseInt(item.ordering),
            status: item.status,
            editorData: item.editorData,
            thumb : item.thumb,
            categoryId:item.categoryId,
            position:item.position,
            // group: {
            //     id: item.group_id,
            //     name: item.group_name
            //   },
              modify: {
                user_name: 'admin',
                user_id: 0
              }
              })  
          }

         if(option.task == 'change-group-name'){
         
          return articlesService.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return categoriesService.find({status:'active'},{id:1, name:1})
  } 
}
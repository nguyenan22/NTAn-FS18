

const articlesModels = require(__path_models + 'articles')
const categoriesModels = require(__path_models + 'categories')
const fs=require('fs')
const fileHelper=require('../helpers/file')

module.exports = {
    listItems: (params,option = null) => {
      console.log(params)
        let objWhere = {};
        if((params.categoryID !=='') && (params.categoryID !=='allvalue'))  {objWhere={categoryId:params.categoryID}}
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.title =  new RegExp(params.keyword, 'i')}
        console.log(objWhere)
        let sort = {}
        sort[params.sortFied] = params.sortType
      return  articlesModels
            .find(objWhere)
            .select('title status ordering  editorData created thumb categoryId position')
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    listItemsFrontEnd :(params,option=null) =>{
      if(option.task=='special-item') {
        return articlesModels
                .find({position:'Top-Post',status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(3)

      }
      if(option.task=='latest-item') {
        return articlesModels
                .find({status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(5)

      }

      if(option.task=='mostPopular-item') {
        return articlesModels
                .aggregate([
                  {$match:{status:'active'}},
                  {$project:{id:1, title: 1, thumb: 1, createdAt: 1}},
                  {$sample:{size:3}}
                ])

      }
    },
    getItems:(id,option = null) =>  {
      return articlesModels.findById(id)
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return articlesModels.count(params.objWhere)
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
            return articlesModels.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return articlesModels.updateMany({_id:{$in:id}}, data)
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
          return articlesModels.updateOne({_id: id}, data )
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
          return articlesModels.updateOne({_id: id}, data )
      }

      if(option.task == 'update-multi'){
          data.position = currentPosition
          return articlesModels.updateMany({_id:{$in:id}}, data)
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
                await articlesModels.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return articlesModels.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await articlesModels.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/articles/',item.thumb)
          })
          return articlesModels.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await articlesModels.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/articles/',item.thumb)
              })
            }
          }
          else {
            await articlesModels.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/articles/',item.thumb)
            })
          }
          return articlesModels.deleteMany({_id:{$in:id}})
    }},
    saveItems: async(item, option = null)=>{
      
        if(option.task == 'add'){
          delete item.id
            item.created = {
                user_name: 'admin',
                user_id: 0
              }
              await articlesModels(item).save().then(async(room) =>{
                let articleArr=await categoriesModels.findById({_id:room.categoryId})
                articleArr.articles.push(room)
                return await categoriesModels(articleArr).save()
              })
          }
  
          if(option.task == 'edit'){
          return articlesModels.updateOne({_id: item.id},{
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
         
          return articlesModels.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return categoriesModels.find({status:'active'},{id:1, name:1})
  } 
}
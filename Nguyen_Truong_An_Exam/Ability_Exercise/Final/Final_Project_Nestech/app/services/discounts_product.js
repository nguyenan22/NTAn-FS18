

const discount_productModels = require(__path_models + 'discounts_product')
const articles_productModels = require(__path_models + 'articles_product')
const categories_productModels = require(__path_models + 'categories_product')
const fs=require('fs')
const fileHelper=require('../helpers/file')

module.exports = {
    listItems: (params,option = null) => {
        let objWhere = {};
        if((params.categoryID !=='') && (params.categoryID !=='allvalue'))  {objWhere={categoryId:params.categoryID}}
        if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
        if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
        let sort = {}
        sort[params.sortFied] = params.sortType
      return  discount_productModels
            .find(objWhere)
            .select()
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    listItemsFrontEnd :(params,option=null) =>{
      if(option.task=='special-item') {
        return discount_productModels
                .find({position:'Top-Post',status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(3)

      }
      if(option.task=='latest-item') {
        return discount_productModels
                .find({status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(5)

      }

      if(option.task=='mostPopular-item') {
        return discount_productModels
                .aggregate([
                  {$match:{status:'active'}},
                  {$project:{id:1, title: 1, thumb: 1, createdAt: 1}},
                  {$sample:{size:3}}
                ])

      }
    },
    getItems:(id,option = null) =>  {
      return discount_productModels.findById(id)
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return discount_productModels.count(params.objWhere)
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
            return discount_productModels.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return discount_productModels.updateMany({_id:{$in:id}}, data)
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
          return discount_productModels.updateOne({_id: id}, data )
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
          return discount_productModels.updateOne({_id: id}, data )
      }

      if(option.task == 'update-multi'){
          data.position = currentPosition
          return discount_productModels.updateMany({_id:{$in:id}}, data)
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
                await discount_productModels.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return discount_productModels.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await discount_productModels.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/articles/',item.thumb)
          })
          return discount_productModels.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await discount_productModels.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/articles/',item.thumb)
              })
            }
          }
          else {
            await discount_productModels.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/articles/',item.thumb)
            })
          }
          return discount_productModels.deleteMany({_id:{$in:id}})
    }},
    saveItems: async(item, option = null)=>{
        if(option.task == 'add'){
          delete item.id
          item.created = {
                user_name: 'admin',
                user_id: 0
              }
              await discount_productModels(item).save().then(async(room) =>{
                 let articleArr=await articles_productModels.findById({_id:room.productList})
                 await articleArr.discountProduct.push(room)
                 return await articles_productModels(articleArr).save()
              })
          }
  
          if(option.task == 'edit'){
            console.log(item)
          return discount_productModels.updateOne({_id: item.id},{
            name: item.name,
            description: item.description,
            ordering: parseInt(item.ordering),
            status: item.status,
            time:item.time,
            productList:item.productList,
            discountValue:item.discountValue,
            modify: {
                user_name: 'admin',
                user_id: 0
              }
              })  
          }

         if(option.task == 'change-group-name'){
         
          return discount_productModels.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return articles_productModels.find({status:'active'},{id:1, name:1})
  } ,
  checkDuplicated: async (val) =>{
    let data = await discount_productModels.find(val)
    return data
}

}
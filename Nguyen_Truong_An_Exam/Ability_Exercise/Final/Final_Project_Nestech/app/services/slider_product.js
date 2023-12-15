

const slider_productModels = require(__path_models + 'slider_product')
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
      return  slider_productModels
            .find(objWhere)
            .select()
            .sort(sort)
            .limit(params.pagination.totalItemsPage)
            .skip((params.pagination.currentPage - 1)*params.pagination.totalItemsPage)
    },
    listItemsFrontEnd :(params,option=null) =>{
      if(option.task=='special-item') {
        return slider_productModels
                .find({position:'Top-Post',status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(3)

      }
      if(option.task=='latest-item') {
        return slider_productModels
                .find({status:'active'})
                .sort({ordering:'asc',createdAt:'desc'})
                .limit(5)

      }

      if(option.task=='mostPopular-item') {
        return slider_productModels
                .aggregate([
                  {$match:{status:'active'}},
                  {$project:{id:1, title: 1, thumb: 1, createdAt: 1}},
                  {$sample:{size:3}}
                ])

      }
    },
    getItems:(id,option = null) =>  {
      return slider_productModels.findById(id)
    },
    countItems:(params, option = null) =>  {
      let objWhere = {};
      if(params.groupID !== 'allvalue') {objWhere['group.id']= params.groupID}
      if(params.currentStatus !== 'all'){objWhere = {status:params.currentStatus}}
      if(params.keyword !== ''){objWhere.name =  new RegExp(params.keyword, 'i')}
       return slider_productModels.count(params.objWhere)
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
            return slider_productModels.updateOne({_id: id}, data )
        }

        if(option.task == 'update-multi'){
            data.status = currentStatus
            return slider_productModels.updateMany({_id:{$in:id}}, data)
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
          return slider_productModels.updateOne({_id: id}, data )
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
          return slider_productModels.updateOne({_id: id}, data )
      }

      if(option.task == 'update-multi'){
          data.position = currentPosition
          return slider_productModels.updateMany({_id:{$in:id}}, data)
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
                await slider_productModels.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success")
        } else {
            return slider_productModels.updateOne({_id: cids}, data)
        }
    },
    deleteItems:async (id, option = null) =>  {
      
        if(option.task == 'delete-one'){
         await slider_productModels.findById(id).then((item)=>{
          fileHelper.remove('public/uploads/articles/',item.thumb)
          })
          return slider_productModels.deleteOne({_id: id}) 
        }

        if(option.task == 'delete-multi'){
          if (Array.isArray(id)){
            for (let i =0; i < id.length; i++){
              await slider_productModels.findById(id[i]).then((item)=>{
                fileHelper.remove('public/uploads/articles/',item.thumb)
              })
            }
          }
          else {
            await slider_productModels.findById(id).then((item) =>{
              fileHelper.remove('public/uploads/articles/',item.thumb)
            })
          }
          return slider_productModels.deleteMany({_id:{$in:id}})
    }},
    saveItems: async(item, option = null)=>{
        if(option.task == 'add'){
          let data={}
          let keys=['name','headertitle','title','description','textbutton','link','ordering','status','thumb']
          keys.forEach(key =>{
            data[key]=item[key]
          })
            data.created = {
                user_name: 'admin',
                user_id: 0
              }
              return await slider_productModels(data).save() 
          }
  
          if(option.task == 'edit'){
          return slider_productModels.updateOne({_id: item.id},{
            name: item.name,
            headertitle: item.headertitle,
            title:item.title,
            textbutton:item.textbutton,
            link:item.link,
            ordering: parseInt(item.ordering),
            status: item.status,
            thumb : item.thumb,
            modify: {
                user_name: 'admin',
                user_id: 0
              }
              })  
          }

         if(option.task == 'change-group-name'){
         
          return slider_productModels.updateMany({'group.id': item.id},{
            group: {
                name: item.name
              }
              })  
          }
        },
  listItemsInSelecbox: (params, option=null)=>{
    return categories_productModels.find({status:'active'},{id:1, name:1})
  } ,
  getListProduct: async (params, option=null)=>{
    return await slider_productModels.find({status:'active'},{id:1, name:1})
  } ,
  checkDuplicated: async (val) =>{
    let data = await slider_productModels.find(val)
    return data
},
  checkExit: async (val) => {
    if (typeof val == 'string') {
      let data = await slider_productModels.exists({ _id: val })
      return data
    } else {
      await Promise.all(val.map(async (id, index) => {
        let data = await articles_productModels.exists({ _id: id })
        return data
      }))
        .catch((error) => {
          return Promise.reject()
        });
    }
  },

}
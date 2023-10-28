const statusModels= async function(groupServer,object) {
    if (object.currentStatus !== 'all') { object.objwhere = {status: object.currentStatus}}
    if (object.keyword !== '') { object.objwhere.name = new RegExp(object.keyword, 'i')}
    await groupServer.count(object.objwhere).then((data)=>{
        object.pagination.totalItems = data
       })
   return  await groupServer
    .find(object.objwhere)
    .sort(object.sort)
    .limit(object.pagination.totalItemsPerPage)
    .skip((object.pagination.currentPage - 1) * object.pagination.totalItemsPerPage)
    
} 

//single status items
const changeStatusModels= async function(id,groupServer,currentStatus,option=''){
    let status = (currentStatus === 'active') ? 'inactive' : 'active'
    let data = {
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    if (option ==='status-one') {
         data.status=status
      return await groupServer.updateOne({_id:id},data)
}    else if(option ==='status-multi') {
        data.status=currentStatus
    return await groupServer.updateMany({_id:{$in: id}},data )
}
}

const deleteModels= async function(id,groupServer,option='') {
    if (option==='delete-one') {
      return await groupServer.deleteOne({_id:id})
    }
    else if (option==='delete-multi') {
      return  await groupServer.deleteMany({_id:{$in: id}})
    }
    
  }

const changeOrderingModels= async function(groupServer,cids,ordering){

if (Array.isArray(cids)) {
    for (let index = 0; index < cids.length; index++) {
    let data = {
        ordering: parseInt(ordering[index]),
        modify: {
        user_name: 'admin',
        user_id: 0
    }}
    await groupServer.updateOne({_id:cids[index]}, data )}
    } else{
    let data = {
        ordering:parseInt(ordering),
        modify: {
        user_name: 'admin',
        user_id: 0
    }}
    await groupServer.updateOne({_id:cids}, data)
    }
}


const formModels= function() {
    let item = {name: '', ordering: 0, status:'novalue'}
    let showError = null
    return {item,showError}
}

const saveEditModels= async function(groupServer,item){
   
   return  await groupServer.updateOne({_id:item.id}, {
        name: item.name,
        ordering: parseInt(item.ordering),
        status: item.status,
        editorData:item.editorData,
        groups_acp:item.groups_acp,
        modify: {
          user_name: 'admin',
          user_id: 0
      }
      })
}

const createNewGroupModels= async function(groupServer,item){
    delete item.id
    item.created = {
      user_name: 'admin',
      user_id: 0
    }
    return new groupServer(item).save()
}

const form = function (pagesTitle,item,errors) {
    return {
      pageTitle: pagesTitle, 
      item, 
      showError:errors.errors 
    }
  }

const sortModels= async function(){

}
module.exports={
    statusModels,
    changeStatusModels,
    deleteModels,
    changeOrderingModels,
    formModels,
    saveEditModels,
    createNewGroupModels,
    form,
    sortModels
}
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
const changeStatusModels= async function(id,groupServer,currentStatus){
    let status = (currentStatus === 'active') ? 'inactive' : 'active'
    let data = {
      status:status,
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    return await groupServer.updateOne({_id:id},data)
}

const deleteModels= async function(id,groupServer) {
    return await groupServer.deleteOne({_id:id})
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

const changeMultiStatusModels=  function(currentStatus){
    let data = {
      status:currentStatus,
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    return data
}

const deleteMultiModels=  function() {

}

const formModels= function() {
    let item = {name: '', ordering: 0, status:'novalue'}
    let showError = null
    return {item,showError}
}

const saveEditModels= async function(usersServer,groupServer,item){
   await usersServer.updateOne({'group.id':item.id},{'group.name':item.name})
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

const sortModels= async function(){

}
module.exports={
    statusModels,
    changeStatusModels,
    deleteModels,
    changeOrderingModels,
    changeMultiStatusModels,
    deleteMultiModels,
    formModels,
    saveEditModels,
    createNewGroupModels,
    sortModels
}
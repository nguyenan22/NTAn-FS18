const statusModels= async function(groupItems,groupID,usersServer,object) {

    if (object.currentStatus !== 'all') { object.objwhere = {status: object.currentStatus}}
    if (object.keyword !== '') { object.objwhere.name = new RegExp(object.keyword, 'i')}
    
    if (groupID==='allgroup') {object.objwhere={}}
    else if (groupID !=='') {object.objwhere={'group.id':groupID}}
    
    await usersServer.count(object.objwhere).then((data)=>{
        object.pagination.totalItems = data
     })
     
 return await usersServer
        .find(object.objwhere)
        .select('userName fullName email group status ordering created modify editorData ')
        .sort(object.sort)
        .limit(object.pagination.totalItemsPerPage)
        .skip((object.pagination.currentPage - 1) * object.pagination.totalItemsPerPage)
} 
//single status users
const changeStatusModels= async function(id,usersServer,currentStatus){
    let status = (currentStatus === 'active') ? 'inactive' : 'active'
    let data = {
      status:status,
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    return await usersServer.updateOne({_id:id},data)
}

const deleteModels= async function(id,usersServer) {
    return await usersServer.deleteOne({_id:id})
  }

const changeOrderingModels= async function(usersServer,cids,ordering){
    if (Array.isArray(cids)) {
        for (let index = 0; index < cids.length; index++) {
          let data = {
            ordering: parseInt(ordering[index]),
            modify: {
              user_name: 'admin',
              user_id: 0
          }}
          await usersServer.updateOne({_id:cids[index]}, data )}
        } else{
          let data = {
            ordering:parseInt(ordering),
            modify: {
              user_name: 'admin',
              user_id: 0
          }}
        await usersServer.updateOne({_id:cids}, data)
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

const formModels= async function(groupsServer) {
    let item = {name: '', ordering: 0, status:'novalue'}
    let showError = null
    let groupItems = await groupsServer.find({status:'active'},{id:1,name:1})
    groupItems.unshift({id:'allgroup',name: 'Choose Group' })
    return {item,showError,groupItems}
}

const saveEditModels= async function(usersServer,item){
    return await usersServer.updateOne({_id:item.id}, {
        fullName: item.fullName,
        userName: item.userName,
        password: item.password,
        email: item.email,
        ordering: parseInt(item.ordering),
        group: {
          id:item.group_id,
          name:item.group_name,
        },
        status: item.status,
        editorData:item.editorData,
        modify: {
          user_name: 'admin',
          user_id: 0
      }
      })
 }

 const createNewGroupModels= async function(usersServer,item){
    delete item.id
    item.created = {
      user_name: 'admin',
      user_id: 0
    }
    item.group = {
      id: item.group_id,
      name: item.group_name
    }
    return new usersServer(item).save()
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
    createNewGroupModels

}
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
const changeStatusModels= async function(id,usersServer,currentStatus,option=''){
  let status = (currentStatus === 'active') ? 'inactive' : 'active'
  let data = {
    modify: {
      user_name: 'admin',
      user_id: 0
  }}
  if (option ==='status-one') {
       data.status=status
    return await usersServer.updateOne({_id:id},data)
}    else if(option ==='status-multi') {
      data.status=currentStatus
  return await usersServer.updateMany({_id:{$in: id}},data )
}
}

const deleteModels= async function(id,usersServer,option='') {
  if (option==='delete-one') {
    return await usersServer.deleteOne({_id:id})
  }
  else if (option==='delete-multi') {
    return  await usersServer.deleteMany({_id:{$in: id}})
  }
  
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

const form = function (pagesTitle,item,errors,groupItems,group_id) {
  return {
    pageTitle: pagesTitle, 
    item, 
    showError:errors.errors,
    groupItems,
    group_id
  }
}
module.exports={
    statusModels,
    changeStatusModels,
    deleteModels,
    changeOrderingModels,
    form,
    formModels,
    saveEditModels,
    createNewGroupModels

}
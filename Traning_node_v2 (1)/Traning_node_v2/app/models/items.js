//list items
const statusModels= async function(ItemServer,object) {

    if (object.currentStatus !== 'all') { object.objwhere = {status: object.currentStatus}}
    if (object.keyword !== '') { object.objwhere.name = new RegExp(object.keyword, 'i')}
    await ItemServer.count(object.objwhere).then((data)=>{
        object.pagination.totalItems = data
       })
   return  await ItemServer
    .find(object.objwhere)
    .sort(object.sort)
    .limit(object.pagination.totalItemsPerPage)
    .skip((object.pagination.currentPage - 1) * object.pagination.totalItemsPerPage)
    
    } 

//single/multi status items
const changeStatusModels= async function(id,ItemServer,currentStatus,option=''){
    let status = (currentStatus === 'active') ? 'inactive' : 'active'
    let data = {
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    if (option ==='status-one') {
         data.status=status
      return await ItemServer.updateOne({_id:id},data)
}    else if(option ==='status-multi') {
        data.status=currentStatus
    return await ItemServer.updateMany({_id:{$in: id}},data )
}
}

// delete one/multi items
const deleteModels= async function(id,ItemServer,option='') {
  if (option==='delete-one') {
    return await ItemServer.deleteOne({_id:id})
  }
  else if (option==='delete-multi') {
    return  await ItemServer.deleteMany({_id:{$in: id}})
  }
  
}

const changeOrderingModels= async function(ItemServer,cids,ordering){

    if (Array.isArray(cids)) {
      for (let index = 0; index < cids.length; index++) {
        let data = {
          ordering: parseInt(ordering[index]),
          modify: {
            user_name: 'admin',
            user_id: 0
        }}
        await ItemServer.updateOne({_id:cids[index]}, data )}
      } else{
        let data = {
          ordering:parseInt(ordering),
          modify: {
            user_name: 'admin',
            user_id: 0
        }}
      await ItemServer.updateOne({_id:cids}, data)
        }
}

const deleteMultiModels= async function() {

}

const formModels= async function() {
    let item = {name: '', ordering: 0, status:'novalue'}
    let showError = null
    return {item,showError}
}

const saveEditModels= async function(ItemServer,item){
 return  await ItemServer.updateOne({_id:item.id}, {
        name: item.name,
        ordering: parseInt(item.ordering),
        status: item.status,
        editorData:item.editorData,
        modify: {
          user_name: 'admin',
          user_id: 0
      }
      })
}


const createNewItemModels= async function(ItemServer,item){
    delete item.id
    item.created = {
      user_name: 'admin',
      user_id: 0
    }
    return new ItemServer(item).save()
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
    createNewItemModels,
    form,
    sortModels
}
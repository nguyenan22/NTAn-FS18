//list items
const statusModels= async function(ItemServer,object) {

    if (object.currentStatus !== 'all') { object.objwhere = {status: object.currentStatus}}
    if (object.keyword !== '') { object.objwhere.name = new RegExp(object.keyword, 'i')}
    await ItemServer.count(object.objwhere).then((data)=>{
        object.pagination.totalItems = data
       })
    return object
    } 

//single status items
const changeStatusModels=  function(currentStatus){
    let status = (currentStatus === 'active') ? 'inactive' : 'active'
    let data = {
      status:status,
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    return data
}

const deleteModels= async function() {

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

const changeMultiStatusModels= async function(currentStatus){
    let data = {
      status:currentStatus,
      modify: {
        user_name: 'admin',
        user_id: 0
    }}
    return data
}

const deleteMultiModels= async function() {

}

const formModels= async function() {
    let item = {name: '', ordering: 0, status:'novalue'}
    let showError = null
    return {item,showError}
}

const saveEditModels= async function(ItemServer,item){
    await ItemServer.updateOne({_id:item.id}, {
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


const createNewItemModels= async function(item){
    delete item.id
    item.created = {
      user_name: 'admin',
      user_id: 0
    }
    return item
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
    createNewItemModels,
    sortModels
}
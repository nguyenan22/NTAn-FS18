

const createStatusFilter = async (currentStatus, collection) => {
  const serverCurrent = require(__path_models + collection)
    let statusFillters = [
        {name: 'ALL', value: 'all',   count: 4,   class: 'primary',   link: '#' }, 
        {name: 'ACTIVE', value: 'active',   count: 4,   class: 'success',   link: '#' },
        {name: 'INACTIVE', value: 'inactive',   count: 4,   class: 'danger',   link: '#' }
      ]
      for (let index = 0; index < statusFillters.length; index++) {
        let objwhere = {}   //all
        let item = statusFillters[index]
        if (item.value !== 'all') {objwhere = {status: item.value}} //active, inactive
          await serverCurrent.count(objwhere).then((data)=>{
            statusFillters[index].count = data
          }) 
      }

    return statusFillters
}

 const countCollection= async (arrKey,collectModel) => {
    for (let index =0 ; index < arrKey.length; index++){
      let key = arrKey[index]
      await collectModel[key].count({}).then((data)=>{
        collectModel[key] = data
      })
    }
    return collectModel
 }
module.exports = {
    createStatusFilter,
    countCollection
}
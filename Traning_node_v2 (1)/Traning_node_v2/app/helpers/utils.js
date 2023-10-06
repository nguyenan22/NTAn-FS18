

const createStatusFilter = async (currentStatus, collection) => {
  const serverCurrent = require(__path_shemas + collection)
    let statusFillters = [
        {name: 'ALL', value: 'all',   count: 4,   class: 'default',   link: '#' }, 
        {name: 'ACTIVE', value: 'active',   count: 4,   class: 'default',   link: '#' },
        {name: 'INACTIVE', value: 'inactive',   count: 4,   class: 'default',   link: '#' }
      ]
    
      for (let index = 0; index < statusFillters.length; index++) {
        let objwhere = {}   //all
        let item = statusFillters[index]
        if (item.value !== 'all') {objwhere = {status: item.value}} //active, inactive
        if (item.value === currentStatus ) {item.class = 'success'}
       await serverCurrent.count(objwhere).then((data)=>{
          statusFillters[index].count = data
        })   
      }

    return statusFillters
}

module.exports = {
    createStatusFilter
}
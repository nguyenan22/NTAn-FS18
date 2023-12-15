
const FileHelpers = require(__path_helpers + 'file');

let deletePhoto = async (id, data, colName) => {
	const articles_productServices = require(__path_services + colName)
	let thumbArray = await articles_productServices.getItemByID(id)
	let dataThum = data.split(",")
	dataThum.shift()
	let filteredArray = thumbArray.thumb.filter(val => !dataThum.includes(val))
	await Promise.all(dataThum.map(async (item,index) => {
		await FileHelpers.remove(`public/uploads/${colName}/`, item);
  }))
  .catch((error) => {
    console.error(error.message)
    return error
  });
	return filteredArray
}

module.exports = {
	deletePhoto
}
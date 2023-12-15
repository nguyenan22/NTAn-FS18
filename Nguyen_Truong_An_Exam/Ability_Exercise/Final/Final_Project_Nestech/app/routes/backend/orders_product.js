var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'orders_product'
const orders_productServices = require(__path_services + colName)
const categories_productServices = require(__path_services + 'categories_product')
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.uploadFileMulti('thumb',colName)
const articlesModels = require(__path_models + 'articles')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Product Management`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const FileHelpers = require(__path_helpers + 'file');
const Libs = require(__path_configs + 'libs')
// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  console.log('test')
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
  
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')
  params.pagination = {
        totalItems: 1,
        totalItemsPerPage: 9,
        currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)) ,
        pageRange: 3
  }
  // console.log(category)
  await  orders_productServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    orders_productServices.listItems(params)
    .then((items)=>{
      console.log(items)
       res.render(`${folderView}list`, { 
         pageTitle: pageTitle, 
         items: items,
         statusFilters: statusFilters,
         params:params,
         statusOrder: Libs.statusOrder,
       })
     })
});



router.post('/change-status/',
	body('status')
		.isInt({min: 0, max: 5})
		.withMessage(notifyConfig.ERROR_ORDER_STATUS),
	async (req, res, next) => {
	try {
			let errors = await validationResult(req)
			if(!errors.isEmpty()) {
				res.send({success: false, errors: errors.errors})
				return
			}
			let {status, id} = req.body
			let changeStatus = await orders_productServices.changeStatus(id, status)
			console.log(changeStatus)
			if(changeStatus){
				res.send({success: true, data: changeStatus, status: Libs.statusOrder[status]})
			} else{
				res.send({success: false, errors:[{msg: notifyConfig.ERROR_ORDER_STATUS_CHANGE}]})
			}
	} catch (error) {
			console.log(error)
			res.send({success: false, errors:[{msg: notify.PRESS_F5_BE}]})
	}

});


router.get('/view-order', 
	async (req, res, next) => {
		let orderData
		try {
			if(req.query.id){
				orderData = await serviceOrder.getOrderById(req.query.id)
				
			}
			res.render(`${folderView}detailorder`, {
					layout: false,
					orderData: orderData,
					statusOrder: Libs.statusOrder,
					pageTitle
			})
		} catch (error) {
			console.log(error)
			res.render(`${folderView}detailorder`, {
				layout: false,
				orderData: orderData,
				statusOrder: Libs.statusOrder,
				pageTitle
		})
		}
});

module.exports = router;

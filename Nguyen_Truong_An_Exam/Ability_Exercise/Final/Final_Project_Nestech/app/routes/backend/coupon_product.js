var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'coupon_product'
const coupon_productServices = require(__path_services + colName)
const categories_productServices = require(__path_services + 'categories_product')
const articles_productServices = require(__path_services + 'articles_product')
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.uploadFileMulti('thumb',colName)
const articlesModels = require(__path_models + 'articles')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Discount Management`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const FileHelpers = require(__path_helpers + 'file');

// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.currentPosition = paramsHelpers.getParam(req.params, 'position', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
  
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')
  params.categoryID = paramsHelpers.getParam(req.session, 'categoryID', '')
  
  let category = []
  await coupon_productServices.listItemsInSelecbox().then(items=>{
    category = items;
    category.unshift({id: 'allvalue', name: 'All categories'})
  })
  params.pagination = {
        totalItems: 1,
        totalItemsPerPage: 9,
        currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)) ,
        pageRange: 3
  }
  // console.log(category)
  await  coupon_productServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    coupon_productServices.listItems(params)
    .then((items)=>{
      // console.log(params)
       res.render(`${folderView}list`, { 
         pageTitle: pageTitle, 
         items: items,
         statusFilters: statusFilters,
         category,
         params:params
       })
     })
});

// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {
  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    await coupon_productServices.deleteItems(arrId,{task: 'delete-multi'} ).then((data)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    await coupon_productServices.deleteItems(id, {task: 'delete-one'}).then((result)=>{
      // req.flash('success',  notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }

});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  const {id,ordering}=req.body
  coupon_productServices.changeOrdering(id, ordering).then((result)=>{
    // req.flash('success',notifyConfig.CHANGE_ORDERING_SUCCESS , linkIndex)
    res.send({success:true})
   })
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  if (status=='multi'){
    coupon_productServices.changeStatus(req.body.id.split(','),req.body.status,{task:'update-multi'}).then((result)=>{
    // req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
    res.send({success:true})
 })
}
else {
    let {status, id}=req.body
    coupon_productServices.changeStatus(id,status,{task:'update-one'}).then((result)=>{
 //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
     res.send({success: true})
  })
}
}
);


// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue' }
  let showError = null
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError });
  } else { //edit
    await coupon_productServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error:showError });
   })
  }
});

// save
router.post('/save/(:id)?', uploadImage,
  body('name')
    .isLength({ min: 5, max: 100 })
    .withMessage(util.format(notifyConfig.ERROR_NAME, 5, 100))
    .custom(async (val, { req }) => {
      let paramId = await (req.params.id != undefined) ? req.params.id : 0
      let data = await coupon_productServices.checkDuplicated({ name: val })
      let length = data.length
      data.forEach((value, index) => {
        if (value.id == paramId)
          length = length - 1;
      })
      if (length > 0) {
        return Promise.reject(notifyConfig.ERROR_NAME_DUPLICATED)
      }
      return
    }),
  body('description')
    .not()
    .isEmpty()
    .withMessage(notifyConfig.ERROR_DESCRIPTION),
  body('ordering')
    .isInt({ min: 0, max: 99 })
    .withMessage(util.format(notifyConfig.ERROR_ORDERING, 0, 99)),
  body('status').not().isIn(['novalue']).withMessage(notifyConfig.ERROR_STATUS),
  body('mintotal')
		.custom(async (val, {req}) => {
			if (!val) return Promise.reject(util.format(notify.ERROR_MINTOTAL_MONEY,500))
			let minTotal = val.replace(/[^0-9]/g, '');
			if(val < 500){
				return Promise.reject(util.format(notify.ERROR_MINTOTAL_MONEY,500))
			}
			return
}),
  body('coupon')
		.isIn(['money','percent'])
		.withMessage(notifyConfig.ERROR_DISCOUNT_UNIT)
		.custom(async (val, {req}) => {
				let {money_input, percent_input} = req.body
				if(!val) return
				if(val == 'money'){
					let number = money_input.replace(/[^0-9]/g, '');
					if (number < 500){
						return Promise.reject(util.format(notifyConfig.ERROR_DISCOUNT_MONEY,500))
					} 
					return
				} else{
					let number = percent_input.replace(/[^0-9]/g, '');
					if (number <= 0 || number > 100 ){
						return Promise.reject(util.format(notifyConfig.ERROR_DISCOUNT_PERCENT,0,100))
					} 
					return
				}
		}),
async function(req, res, next) {
  try {
    let item = req.body;
    let itemData
    if(req.params.id != undefined){
      itemData = await coupon_productServices.getItems(req.params.id)
    }
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
      let productList=await articles_productServices.getListProduct()
      if (req.params.id !== undefined){
          res.render(`${folderView}form`, {
            pageTitle,
            productList, Error: errors.errors,
            item: itemData,
            id: req.params.id
            
          })
      } else {
        res.render(`${folderView}form`, {
          pageTitle,
          productList, Error: errors.errors,
          item: req.body
        })
      }
      return
    }
    const {coupon,money_input,percent_input,mintotal,maxdown}=item
      if (req.params.id !== undefined) {
        item.id=req.params.id
        if (coupon =='percent') {
          item.couponValue={
            'unit':coupon,
            'value':percent_input.replace(/[^0-9]/g, ''),
            'maxDown':maxdown.replace(/[^0-9]/g, ''),
        }}
        else {
          item.couponValue={
            'unit':coupon,
            'value':money_input.replace(/[^0-9]/g, ''),
            'minTotal':mintotal.replace(/[^0-9]/g, ''),
          }
        }
        await coupon_productServices.saveItems(item,{task:'edit'}).then(() =>{
          req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex);
        })
      } else {
        if (coupon =='percent') {
          item.couponValue={
            'unit':coupon,
            'value':percent_input.replace(/[^0-9]/g, ''),
            'maxDown':maxdown.replace(/[^0-9]/g, ''),
          }
        }
        else {
          item.couponValue={
            'unit':coupon,
            'value':money_input.replace(/[^0-9]/g, ''),
            'minTotal':mintotal.replace(/[^0-9]/g, ''),
          }
        }
        let data = await coupon_productServices.saveItems(item,{task:'add'}).then(() =>{
          req.flash('success', notifyConfig.ADD_SUCCESS,linkIndex);
          
        })     
      }
    } catch (error) {
      console.log(error)
      console.log(req.flash('error', "Có lỗi xảy ra",linkIndex));
    }
});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});

router.post('/change-time', 
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
		if (! errors.isEmpty()) {
			res.send({success: false, errors: errors})
			return
		}
		let {time, id} = req.body
		let changeTime = await coupon_productServices.changeTime(id, time)
		res.send({success: true})
		} catch (error) {
			res.send({success: false})
			console.log(error)
		}
});


module.exports = router;

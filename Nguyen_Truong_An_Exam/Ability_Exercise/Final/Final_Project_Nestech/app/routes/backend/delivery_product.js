var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'delivery_product'

const delivery_productServices = require(__path_services + colName)
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');

let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Delivery Product`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
// list Items
router.get('(/status/:status)?', async function(req, res, next) {
let params = {} 
params.currentStatus = paramsHelpers.getParam(req.params,'status', 'all')
let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
params.keyword       = paramsHelpers.getParam(req.query,'keyword','')
params.sortField = paramsHelpers.getParam(req.session,'sort_field','ordering')
params.sortType = paramsHelpers.getParam(req.session,'sort_type','asc')

params.pagination = {
  totalItems: 1,
  totalItemsPerPage: 5,
  currentPage: parseInt(paramsHelpers.getParam(req.query,'page',1)),
  pageRanges: 3
}

await delivery_productServices.countItems(params).then((data)=>{
  params.pagination.totalItems = data
 })
 
 delivery_productServices.listItems(params)
    .then((items)=>{
      res.render(`${folderView}list`, { 
        pageTitle: pageTitle,
        items,
        statusFilters,
        params
       });
      }) 
});


// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {
  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    await delivery_productServices.deleteItems(arrId,{task: 'delete-multi'} ).then((data)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    await delivery_productServices.deleteItems(id, {task: 'delete-one'}).then((result)=>{
      // req.flash('success',  notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }

});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  const {id,ordering}=req.body
  delivery_productServices.changeOrdering(id, ordering).then((result)=>{
    // req.flash('success',notifyConfig.CHANGE_ORDERING_SUCCESS , linkIndex)
    res.send({success:true})
   })
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  if (status=='multi'){
    delivery_productServices.changeStatus(req.body.id.split(','),req.body.status,{task:'update-multi'}).then((result)=>{
    // req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
    res.send({success:true})
 })
}
else {
    let {status, id}=req.body
    delivery_productServices.changeStatus(id,status,{task:'update-one'}).then((result)=>{
 //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
     res.send({success: true})
  })
}
}
);

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue'}
  let showError = ''
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError });
  } else { //edit
    await delivery_productServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error: showError });
   })
  }
});

// save
router.post('/save/(:id)?', 
  body('province')
    .isLength({ min: 5, max: 100 })
    .withMessage(util.format(notifyConfig.ERROR_NAME, 5, 100))
    .custom(async (val, { req }) => {
      let paramId = await (req.params.id != undefined) ? req.params.id : 0
      let data = await delivery_productServices.checkDuplicatedName(val)
      let length = data.length
      data.forEach((value, index) => {
        if (value.id == paramId)
          length = length - 1;
      })
      console.log(length)
      if (length > 0) {
        return Promise.reject(notifyConfig.ERROR_NAME_DUPLICATED)
      }
      return
    }),
  body('cost')
    .custom(async (val, { req }) => {
      if (!val) return Promise.reject(notifyConfig.ERROR_COST)
      let price = val.replace(/[^0-9]/g, '');
      if (price < 0) {
        return Promise.reject(util.format(notifyConfig.ERROR_COST_SHIP, 0))
      }
      return
    }),
  body('ordering')
    .isInt({ min: 0, max: 99 })
    .withMessage(util.format(notifyConfig.ERROR_ORDERING, 0, 99)),
  body('status').not().isIn(['novalue']).withMessage(notifyConfig.ERROR_STATUS),
  async function (req, res, next) {
    const errors = validationResult(req);
    req.body = JSON.parse(JSON.stringify(req.body));
    let item = Object.assign(req.body)
    item.id=req.params.id
    let taskCurrent = (typeof item !== undefined && item.id !== undefined) ? 'edit' : 'add'
    if (!errors.isEmpty()) {
      let pageTitle = (taskCurrent == 'add') ? pageTitleAdd : pageTitleEdit
      res.render(`${folderView}form`, {
        pageTitle, item, Error: errors.errors
      })
    } else {
      
      let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
      delivery_productServices.saveItems(item, { task: taskCurrent }).then((result) => {
        req.flash('success', message, linkIndex)
      });
    }
  });


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});


module.exports = router;



var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'categories_product'

const categories_productServices = require(__path_services + colName)
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');

let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Category Product`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const middleUserInfo= require('../../middleware/getUsers')
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

await categories_productServices.countItems(params).then((data)=>{
  params.pagination.totalItems = data
 })
 
 categories_productServices.listItems(params)
    .then((items)=>{
      res.render(`${folderView}list`, { 
        pageTitle: pageTitle,
        items,
        statusFilters,
        params
       });
      }) 
});

// change status single
// router.get('/change-status/:status/:id', async function(req, res, next) {
//   console.log(req.params)
//   let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
//   let id = paramsHelpers.getParam(req.params,'id', '')
//   await CategoriesServices.changeStatus(currentStatus,id, {task:"changeStatus-one"}).then((result)=>{
//       // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
//       res.send({success: true})
//    })
// });


// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {
  console.log(req.params.id)
  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    await categories_productServices.deleteItems(arrId,{task: 'delete-multi'} ).then((data)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    await categories_productServices.deleteItems(id, {task: 'delete-one'}).then((result)=>{
      // req.flash('success',  notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }

});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  const {id,ordering}=req.body
  // let cids = req.body.cid
  // let ordering = req.body.ordering
  categories_productServices.changeOrdering(id, ordering).then((result)=>{
    // req.flash('success',notifyConfig.CHANGE_ORDERING_SUCCESS , linkIndex)
    res.send({success:true})
   })
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  console.log(req.params)
    if (status=='multi'){
      await categories_productServices.changeStatus(req.body.status,req.body.id.split(','),{task:'changeStatus-multi'}).then((data)=>{
      // req.flash('warning', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS,data.matchedCount) ,linkIndex)
      res.send({success: true})
      })
    }
    else {
      let {status, id}=req.body
       await categories_productServices.changeStatus(status,id, {task:"changeStatus-one"}).then((result)=>{
      //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
          res.send({success: true})
       })
    }

});

// delete multi
// router.post('/delete/', async function(req, res, next) {
//   await CategoriesServices.deleteItems(req.body.id,{task: 'delete-multi'} ).then((data)=>{
//     // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount), linkIndex)
//     res.send({success:true})
//   });
// });

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue'}
  let showError = ''
  if (id === '') { //add
    console.log('add')
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError });
  } else { //edit
    await categories_productServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error: showError });
   })
  }
});

// save
router.post('/save/(:id)?', 
body('name')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_NAME,5,100)),
body('ordering')
  .isInt({ min: 1, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_ORDERING,1,100)),
body('status')
  .not()
  .isIn(['novalue'])
  .withMessage(util.format(notifyConfig.ERROR_STATUS)),
async function(req, res, next) {
  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  let taskCurrent = (typeof item !== undefined && item.id !== '') ? 'edit' : 'add'
  console.log('taskCurrent:',taskCurrent)
  console.log(item)
  if (!errors.isEmpty()) {
    let pageTitle = (taskCurrent == 'add') ? pageTitleAdd : pageTitleEdit
      res.render(`${folderView}form`, { pageTitle, item, Error: errors.errors
      })
  } else {
    let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
    categories_productServices.saveItems(item,{task: taskCurrent}).then((result)=>{
      req.flash('success', message , linkIndex)
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



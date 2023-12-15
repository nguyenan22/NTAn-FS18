var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'articles'
const articlesServices = require(__path_services + colName)
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.upload('thumb',colName)
const articlesModels = require(__path_models + 'articles')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Article Blog`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const fileHelper=require('../../helpers/file')

// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.currentPosition = paramsHelpers.getParam(req.params, 'position', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  console.log(params.keyword)
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
  console.log(statusFilters)
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')
  params.categoryID = paramsHelpers.getParam(req.session, 'categoryID', '')
  
  let category = []
  await articlesServices.listItemsInSelecbox().then(items=>{
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
  await  articlesServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    articlesServices.listItems(params)
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

// change status single
// router.get('/change-status/:status/:id', async function(req, res, next) {
//   let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
//   let id = paramsHelpers.getParam(req.params, 'id', '');
//   articlesServices.changeStatus(id,currentStatus,{task:'update-one'}).then((result)=>{
//     req.flash('success', notifyConfig.CHANGE_STATUS_SUCCESS, linkIndex)
//   });
// });

// change category
router.get('/change-category/:category_id/:id', async function(req, res, next) {
  req.session.change_categoryID = paramsHelpers.getParam(req.params, 'category_id','')
  let id = paramsHelpers.getParam(req.params, 'id', '');
  articlesServices.changeCategory(id,req.session.change_categoryID,{task:'update-one'}).then((result)=>{
    req.flash('success', notifyConfig.CHANGE_CATEGORY_SUCCESS, linkIndex)
  });
});
router.get('/change-position/:position/:id', async function(req, res, next) {
  let currentPosition = paramsHelpers.getParam(req.params, 'position', 'Top-Post');
  let id = paramsHelpers.getParam(req.params, 'id', '');
  articlesServices.changePosition(id,currentPosition,{task:'update-one'}).then((result)=>{
    req.flash('success', notifyConfig.CHANGE_POSITION_SUCCESS, linkIndex)
  });
});

// delete single/multi
router.post('/delete/(:id)?', async function(req, res, next) {
  console.log('test')
  if (req.params.id==='multi'){
    let arrId=req.body.id.split(',')
    articlesServices.deleteItems(arrId, {task:'delete-multi'}).then((result)=>{
      // req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
      res.send({success:true})
    });
  }
  else {
    let id = req.body.id
    console.log(id)
    articlesServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
      // req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
      res.send({success:true})
    });
  }
  // await articlesModels.getItems(id).then((item) =>{
  //   fs.unlink(`public/uploads/users/${item.avatar}`,(err) => {if (err) console.log(err)})
  // })
  // articlesServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
  //   req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
  // });
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let oderings = req.body.ordering
  articlesServices.changeOrdering(cids, oderings, null).then((result)=>{
  req.flash('success', notifyConfig.CHANGE_ORDERING_SUCCESS, linkIndex)
})
});

// change status single/multi
router.post('/change-status/(:status)?', async function(req, res, next) {
  let {status}=req.params
  if (status=='multi'){
    articlesServices.changeStatus(req.body.id.split(','),req.body.status,{task:'update-multi'}).then((result)=>{
    // req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
    res.send({success:true})
 })
}
else {
    let {status, id}=req.body
    articlesServices.changeStatus(id,status,{task:'update-one'}).then((result)=>{
 //     // req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
     res.send({success: true})
  })
}
}
);

router.post('/change-position/:position', async function(req, res, next) {
  let currentPosition = paramsHelpers.getParam(req.params, 'position', 'Top-Post');
  articlesServices.changeStatus(req.body.cid, currentPosition,{task:'update-multi'}).then((result)=>{
   req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
 })
});

router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  articlesServices.changeStatus(req.body.cid, currentStatus,{task:'update-multi'}).then((result)=>{
   req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
 })
});


// delete multi
// router.post('/delete/', async function(req, res, next) {
//   articlesServices.deleteItems(req.body.cid, {task:'delete-multi'}).then((result)=>{
//     req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
//   });
// });

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue' }
  let showError = null
  let categoriesItems=await articlesServices.listItemsInSelecbox()
    categoriesItems.unshift({id: 'allValue', name: 'Choose Category'})
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, Error:showError,categoriesItems });
  } else { //edit
    await articlesServices.getItems(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, Error:showError,categoriesItems });
   })
  }
});

// save
router.post('/save/', uploadImage,
body('title')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_FULLNAME,5,100)),
body('ordering')
  .isInt({ min: 1, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_ORDERING,1,100)),
body('status')
  .not()
  .isIn(['novalue'])
  .withMessage(util.format(notifyConfig.ERROR_STATUS)),
body('categoriesId')
.not()
.isIn(['allValue'])
.withMessage(util.format(notifyConfig.ERROR_CATEGORY)),
body('thumb')
  .custom((value, {req}) => {
    const {image_old, image_upload } = req.body
    console.log(image_old,image_upload)
    if(!image_upload && !image_old){
     return Promise.reject(notifyConfig.ERROR_NOT_IMAGE)
    }
    return true
  }),
  body('postion')
  .not()
  .isIn(['novalue'])
  .withMessage(util.format(notifyConfig.ERROR_POSTION)),
async function(req, res, next) {
  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  let taskCurrent = (typeof item !== 'undefined' && item.id !== '') ? 'edit' : 'add'
  let itemData={}
  if(req.params.id !=undefined) {
    itemData=await articlesModels.find({_id:req.params.id})
  }
  if (!errors.isEmpty()) {
    let pageTitle = (taskCurrent == 'add') ? pageTitleAdd : pageTitleEdit
      if (req.file !==undefined) fileHelper.remove('public/uploads/articles/',req.file.filename)
      let itemList=(taskCurrent==='edit')? itemData : req.body
      let categoriesItems=await articlesServices.listItemsInSelecbox()
     categoriesItems.unshift({id: 'allValue', name: 'Choose Category'})
      res.render(`${folderView}form`, { pageTitle, item:itemList, showError: errors.errors, categoriesItems
      })
  } else {
    if (req.file == undefined) { // Không muốn up lại ảnh
      item.thumb = item.image_old
    } else { // up lại ảnh
      item.thumb= req.file.filename
     if(taskCurrent == 'edit') fileHelper.remove("public/uploads/articles/", item.image_old);
    }
    let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
    articlesServices.saveItems(item,{task: taskCurrent}).then((result)=>{
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

// filter
router.get('/filter-category/:category_id', async function(req, res, next) {
  req.session.categoryID = paramsHelpers.getParam(req.params, 'category_id','')
  res.redirect(linkIndex)
});


// upload

router.get('/uploads', async function(req, res, next) {
  res.render(`${folderView}uploads`, { pageTitle: pageTitleEdit });
});

router.post('/uploads/',uploadImage, async function (req,res,next){
  res.render(`${folderView}uploads`, { pageTitle: pageTitleEdit });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');


const fs=require('fs')
const colName = 'users'
const usersServices = require(__path_services + colName)
const groupsServer = require(__path_models + 'groups')
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const uploadHelpers = require(__path_helpers+'file')
const uploadImage = uploadHelpers.upload('avatar')

let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Users Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const fileHelper=require('../../helpers/file')

// list Items
router.get('(/status/:status)?', async function(req, res, next) {
  let params = {}
  params.currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
  params.keyword = paramsHelpers.getParam(req.query, 'keyword', '')
  let statusFilters = await utilsHelpers.createStatusFilter(params.currentStatus, colName)
 
  params.sortFied = paramsHelpers.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramsHelpers.getParam(req.session, 'sort_type', 'asc')
  params.groupID = paramsHelpers.getParam(req.session, 'group_id', '')
  
  let category = []
  await usersServices.listItemsInSelecbox().then(items=>{
    category = items;
    category.unshift({id: 'allvalue', name: 'All groups'})
  })
  params.pagination = {
        totalItems: 1,
        totalItemsPerPage: 9,
        currentPage: parseInt(paramsHelpers.getParam(req.query, 'page', 1)) ,
        pageRange: 3
  }
  await  usersServices.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    usersServices.listItems(params)
    .then((items)=>{
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
router.get('/change-status/:status/:id', async function(req, res, next) {
  let modify=req.user 
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  let id = paramsHelpers.getParam(req.params, 'id', '');
  usersServices.changeStatus(id,currentStatus,{task:'update-one'},modify).then((result)=>{
    req.flash('success', notifyConfig.CHANGE_STATUS_SUCCESS, linkIndex)
  });
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params, 'id', '');
  // await usersModels.getItems(id).then((item) =>{
  //   fs.unlink(`public/uploads/users/${item.avatar}`,(err) => {if (err) console.log(err)})
  // })
  usersServices.deleteItems(id,{task:'delete-one'}).then((result)=>{
    req.flash('success', notifyConfig.DELETE_SUCCESS, linkIndex)
  });
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let modify=req.user
  let cids = req.body.cid
  let oderings = req.body.ordering
  usersServices.changeOrdering(cids, oderings, null,modify).then((result)=>{
  req.flash('success', notifyConfig.CHANGE_ORDERING_SUCCESS, linkIndex)
})
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let modify=req.user
  let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active');
  usersServices.changeStatus(req.body.cid, currentStatus,{task:'update-multi'},modify).then((result)=>{
   req.flash('success', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS, result.matchedCount), linkIndex)
 })
});

// delete multi
router.post('/delete/', async function(req, res, next) {
  usersServices.deleteItems(req.body.cid, {task:'delete-multi'}).then((result)=>{
    req.flash('success', util.format(notifyConfig.DELETE_MULTI_SUCCESS, result.deletedCount), linkIndex)
  });
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {name: '', ordering: 0, status:'novalue',group_id: '',group_name:''  }
  let showError = null
  await usersServices.listItemsInSelecbox().then(items=>{
    groupItems = items;
    groupItems.unshift({id: 'allValue', name: 'Choose Groups'})
  })
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, showError,groupItems });
  } else { //edit
    await usersServices.getItems(id).then((item)=>{
      item.group_id = item.group.id
      item.group_name = item.group.name
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError,groupItems });
   })
  }
});

// save
router.post('/save/', uploadImage,
body('fullName')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_FULLNAME,5,100)),
body('userName')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_USERNAME,5,100)),
body('password')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_PASSWORD,5,100)),
body('email')
  .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  .withMessage(util.format(notifyConfig.ERROR_EMAIL,5,100)),
body('ordering')
  .isInt({ min: 1, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_ORDERING,1,100)),
body('status')
  .not()
  .isIn(['novalue'])
  .withMessage(util.format(notifyConfig.ERROR_STATUS)),
  body('group_name')
  .isIn(['Member'])
  .withMessage(util.format(notifyConfig.ERROR_GROUP)),
body('avatar')
  .custom((value, {req}) => {
    const {image_old, image_upload } = req.body
    if(!image_upload && !image_old){
     return Promise.reject(notifyConfig.ERROR_NOT_IMAGE)
    }
    return true
  }),
async function(req, res, next) {
  const errors = validationResult(req);
  let creater=req.user
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  let taskCurrent = (typeof item !== 'undefined' && item.id !== '') ? 'edit' : 'add'

  if (!errors.isEmpty()) {
    let pageTitle = (taskCurrent == 'add') ? pageTitleAdd : pageTitleEdit
      if (req.file !==undefined) fileHelper.remove('public/uploads/users/',req.file.filename)
      let groupItems = []
      await usersServices.listItemsInSelecbox().then(items=>{
        groupItems = items;
        groupItems.unshift({id: 'allValue', name: 'Choose Groups'})
      })
      res.render(`${folderView}form`, { pageTitle, item, showError: errors.errors, groupItems
      })
  } else {
    if (req.file == undefined) { // Không muốn up lại ảnh
      item.avatar = item.image_old
    } else { // up lại ảnh
      console.log(req.body)
      item.avatar = req.file.filename
     if(taskCurrent == 'edit') fileHelper.remove("public/uploads/users/", item.image_old);
    }
    let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
    console.log(item)
    usersServices.saveItems(item,{task: taskCurrent},creater).then((result)=>{
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
router.get('/filter-group/:group_id', async function(req, res, next) {
  req.session.groupID = paramsHelpers.getParam(req.params, 'group_id','')
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

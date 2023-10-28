var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'groups'

const groupServer = require(__path_shemas + colName)
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const usersServer = require(__path_shemas + 'users')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Groups Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views +`pages/${colName}/`
const groupsModel=require('../../models/groups')
// list Items
router.get('(/status/:status)?', async function(req, res, next) {
let objwhere = {}
let currentStatus = paramsHelpers.getParam(req.params,'status', 'all')
let keyword       = paramsHelpers.getParam(req.query,'keyword','')
let statusFillters = await utilsHelpers.createStatusFilter(currentStatus,colName)
let pagination = {
  totalItems: 1,
  totalItemsPerPage: 9,
  currentPage: 1,
  pageRange: 3
}
pagination.currentPage = parseInt(paramsHelpers.getParam(req.query,'page',1)) 

const sortField = paramsHelpers.getParam(req.session,'sort_field','ordering')
const sortType = paramsHelpers.getParam(req.session,'sort_type','asc')
let sort = {}
sort[sortField] = sortType
let object={keyword,statusFillters,sort,pagination,objwhere,currentStatus}
groupsModel.statusModels(groupServer,object).then((items)=>{
      res.render(`${folderView}list`, { 
        pageTitle: pageTitle,
        items,
        statusFillters,
        currentStatus,
        keyword,
        pagination:object.pagination,
        sortField,
        sortType
       });
      }) 
});

// change status single
router.get('/change-status/:status/:id', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let id = paramsHelpers.getParam(req.params,'id', '')
  groupsModel.changeStatusModels(id,groupServer,currentStatus,'status-one').then(()=>{
        req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
   })
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  groupsModel.deleteModels(id,groupServer,'delete-one').then((data)=>{
    req.flash('warning',notifyConfig.DELETE_SUCCESS ,linkIndex)
   })
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let ordering = req.body.ordering
  await groupsModel.changeOrderingModels(groupServer,cids,ordering)
      req.flash('warning',notifyConfig.CHANGE_ORDERING_SUCCESS ,linkIndex)
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let reqBody= req.body.cid
  //hàm xử lý
  groupsModel.changeStatusModels(reqBody,groupServer,currentStatus,'status-multi').then((data)=>{
    req.flash('warning', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS,data.matchedCount) ,linkIndex)
})
});

// delete multi
router.post('/delete/', async function(req, res, next) {
  let reqBody= req.body.cid
  groupsModel.deleteModels(reqBody,groupServerServer,'delete-multi').then((data)=>{
    req.flash('warning',util.format( notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount),linkIndex)
})
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let data = groupsModel.formModels()
  if (id === '') { //add
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item:data.item, showError:data.showError });
  } else { //edit
    await groupServer.findById(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError:data.showError });
   })
  }
});

// save
router.post('/save/', 
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
  if (item.id !=='' && item !== undefined) { //edit
    if (!errors.isEmpty()) { // có lỗi
      res.render(`${folderView}form`, form(pageTitleEdit,item,errors));
    }else{ // kh lỗi
      await usersServer.updateOne({'group.id':item.id},{'group.name':item.name})
      groupsModel.saveEditModels(groupServer,item).then((data)=>{
        req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex)
   })
    }
  } else { //add
    if (!errors.isEmpty()) { // có lỗi
      res.render(`${folderView}form`, form(pageTitleAdd,item,errors))
    } else { // không lỗi
        groupsModel.createNewGroupModels(groupServer,item).then((result)=>{
        req.flash('success', notifyConfig.ADD_SUCCESS,linkIndex)
      })
    }
  }
  
  
 
  
});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});

router.get('/change-group/:id/:groups_acp', async function(req, res, next) {
  let currentGroup = paramsHelpers.getParam(req.params,'groups_acp', 'yes')
  let id = paramsHelpers.getParam(req.params,'id', '')
  let group = (currentGroup === 'yes') ? 'no' : 'yes'
  let data = {
    groups_acp:group,
    modify: {
      user_name: 'admin',
      user_id: 0
  }}
  await groupServer.updateOne({_id:id},data).then(()=>{
        req.flash('warning',notifyConfig.CHANGE_GROUPS_SUCCESS ,linkIndex)
   })

});


module.exports = router;

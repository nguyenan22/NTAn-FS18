var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');
const { constrainedMemory } = require('node:process');

const colName = 'users'
const usersServer = require(__path_shemas + colName)
const groupsServer = require(__path_shemas + 'groups')
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
const folderView = __path_views +`pages/${colName}/`
const usersModel=require('../../models/users')
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
const groupID = paramsHelpers.getParam(req.session,'groupID','')
let sort = {}
sort[sortField] = sortType
let groupItems = await groupsServer.find({status:'active'},{id:1,name:1})
groupItems.unshift({id:'allgroup',name: 'Choose Group' })
let object={keyword,statusFillters,sort,pagination,objwhere,currentStatus}
usersModel.statusModels(groupItems,groupID,usersServer,object)
    .then((items)=>{
      res.render(`${folderView}list`, { 
        pageTitle: pageTitle,
        items,
        statusFillters,
        currentStatus,
        keyword,
        pagination:object.pagination,
        sortField,
        sortType,
        groupID,
        groupItems
       });
      }) 
});

// change status single
router.get('/change-status/:status/:id', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let id = paramsHelpers.getParam(req.params,'id', '')
  usersModel.changeStatusModels(id,usersServer,currentStatus,'status-one').then(()=>{
        req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
   })
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  usersModel.deleteModels(id,usersServer,'delete-one').then((data)=>{
    req.flash('warning',notifyConfig.DELETE_SUCCESS ,linkIndex)
   })
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let ordering = req.body.ordering
  usersModel.changeOrderingModels(usersServer,cids,ordering).then(() =>{
    req.flash('warning',notifyConfig.CHANGE_ORDERING_SUCCESS ,linkIndex)
  })
    
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let reqBody= req.body.cid
  //hàm xử lý
  usersModel.changeStatusModels(reqBody,usersServer,currentStatus,'status-multi').then((data)=>{
    req.flash('warning', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS,data.matchedCount) ,linkIndex)
})
});

// delete multi
router.post('/delete/', async function(req, res, next) {
  let reqBody= req.body.cid
  usersModel.deleteModels(reqBody,usersServer,'delete-multi').then((data)=>{
    req.flash('warning',util.format( notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount),linkIndex)
})
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
 let data= await usersModel.formModels(groupsServer)
  if (id === '') { //add
    let group_id=''
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item:data.item, showError:data.showError,groupItems:data.groupItems,group_id });
  } else { //edit
    await usersServer.findById(id).then((item)=>{
     let group_id=item.group.id
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError:data.showError,groupItems:data.groupItems,group_id });
   })
  }
});

// save
router.post('/save/', 
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
  .isLength({ min: 5, max:100 })
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
async function(req, res, next) {
  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  let groupItems = await groupsServer.find({status:'active'},{id:1,name:1})
  if (item.id !=='' && item !== undefined) { //edit
    let group_id=item.group_id
    if (!errors.isEmpty()) { // có lỗi
      res.render(`${folderView}form`, usersModel.form(pageTitleEdit,item,errors,groupItems,group_id));
    }else{ // kh lỗi
      console.log(req.body)
      usersModel.saveEditModels(usersServer,item).then((data)=>{
        req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex)
   })
    }
  } else { //add
    if (!errors.isEmpty()) { // có lỗi
      // let groupItems = await groupsServer.find({status:'active'},{id:1,name:1})
      let group_id=''
      groupItems.unshift({id:'allgroup',name: 'Choose Group' })
      res.render(`${folderView}form`,usersModel.form(pageTitleAdd,item,errors,groupItems,group_id));
    } else { // không lỗi
        item.avatar=req.file.filename
        usersModel.createNewGroupModels(usersServer,item).then((result)=>{
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

//filter-group
router.get('/filter-group/:group_id', async function(req, res, next) {
  req.session.groupID=paramsHelpers.getParam(req.params,'group_id','')
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

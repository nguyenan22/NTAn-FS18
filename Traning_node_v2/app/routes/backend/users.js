var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'users'
var paths = require('path');
const userServer = require(__path_shemas + colName)
const utilsHelpers = require(__path_helpers + 'utils')
const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const groupServer=require(__path_shemas+ 'groups')
let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Users Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views +`pages/${colName}/`
const multer  = require('multer')
const randomstring=require('randomstring');
const path = require('../../../path');
const { Console } = require('node:console');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __path_uploads + 'users')
  },
  filename: function (req, file, cb) {
    cb(null, randomstring.generate(10) + paths.extname(file.originalname))
  }
})
const upload = multer({ storage: storage,
  limits: { fileSize: 1 * 1024 *1024},
  fileFilter: function (req,file,cb){
    const fileTyles=new RegExp('jpeg|jpg|png|gif')
    const extname=fileTyles.test(paths.extname(file.originalname).toLowerCase())
    const mimetype=fileTyles.test(file.mimetype)
    if (mimetype && extname ){
      cb(null,true)
    }
    else {
      return cb(new Error(notifyConfig.ERROR_FILE))
    }
  }
})

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


if (currentStatus !== 'all') { objwhere = {status: currentStatus}}
if (keyword !== '') { objwhere.name = new RegExp(keyword, 'i')}

await userServer.count(objwhere).then((data)=>{
  pagination.totalItems = data
 })
 
    await userServer
    .find(objwhere)
    .sort(sort)
    .limit(pagination.totalItemsPerPage)
    .skip((pagination.currentPage - 1) * pagination.totalItemsPerPage)
    .then((items)=>{
      res.render(`${folderView}list`, { 
        pageTitle: pageTitle,
        items,
        statusFillters,
        currentStatus,
        keyword,
        pagination,
        sortField,
        sortType
       });
      }) 
});

// change status single
router.get('/change-status/:status/:id', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let id = paramsHelpers.getParam(req.params,'id', '')
  let status = (currentStatus === 'active') ? 'inactive' : 'active'
  let data = {
    status:status,
    modify: {
      user_name: 'admin',
      user_id: 0
  }}
  await userServer.updateOne({_id:id},data).then(()=>{
        req.flash('warning',notifyConfig.CHANGE_STATUS_SUCCESS ,linkIndex)
   })
});

// delete single
router.get('/delete/:id', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  await userServer.deleteOne({_id:id}).then((data)=>{
    req.flash('warning',notifyConfig.DELETE_SUCCESS ,linkIndex)
   })
});

// change-ordering
router.post('/change-ordering/', async function(req, res, next) {
  let cids = req.body.cid
  let ordering = req.body.ordering
  if (Array.isArray(cids)) {
    for (let index = 0; index < cids.length; index++) {
      let data = {
        ordering: parseInt(ordering[index]),
        modify: {
          user_name: 'admin',
          user_id: 0
      }}
      await userServer.updateOne({_id:cids[index]}, data )}
    } else{
      let data = {
        ordering:parseInt(ordering),
        modify: {
          user_name: 'admin',
          user_id: 0
      }}
    await userServer.updateOne({_id:cids}, data)
      }
      req.flash('warning',notifyConfig.CHANGE_ORDERING_SUCCESS ,linkIndex)
});

// change status multi
router.post('/change-status/:status', async function(req, res, next) {
  let currentStatus = paramsHelpers.getParam(req.params,'status', 'active')
  let data = {
    status:currentStatus,
    modify: {
      user_name: 'admin',
      user_id: 0
  }}
  await userServer.updateMany({_id:{$in: req.body.cid}},data ).then((data)=>{
    req.flash('warning', util.format(notifyConfig.CHANGE_STATUS_MULTI_SUCCESS,data.matchedCount) ,linkIndex)
})
});

// delete multi
router.post('/delete/', async function(req, res, next) {
  await userServer.deleteMany({_id:{$in: req.body.cid}}).then((data)=>{
    req.flash('warning',util.format( notifyConfig.DELETE_MULTI_SUCCESS,data.deletedCount),linkIndex)
})
});

// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramsHelpers.getParam(req.params,'id', '')
  let item = {fullName: '',userName: '',password:'',avatar:'',group:'',groups_acp:'', ordering: 0, status:'novalue'}
  let showError = null
  let groupItems=await groupServer.find({status:'active'},{id:1,name:1})
  groupItems.unshift({id:'allgroup',name: 'Choose Group' })
  if (id === '') { //add
    let option=''
    console.log(option)
    res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, showError,groupItems,option });
  } else { //edit
    let groupId=await userServer.find({_id:id},{group:1})
    let option=groupId[0].group.id
    await userServer.findById(id).then((item)=>{
    res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError, groupItems,option });
   })
  }
});

// save
router.post('/save/', 
body('fullName')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_NAME,5,100)),
  body('userName')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_NAME,5,100)),
  body('password')
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
      res.render(`${folderView}form`, { 
        pageTitle: pageTitleEdit, 
        item, 
        showError:errors.errors 
      });
    }else{ // kh lỗi
      let groupItems=await groupServer.find({_id:item.group},{id:1,name:1})
      await userServer.updateOne({_id:item.id}, {
        fullName: item.fullName,
        userName:item.userName,
        password:item.password,
        avatar:item.avatar,
        ordering: parseInt(item.ordering),
        status: item.status,
        group:{
          id:groupItems[0].id,
          name:groupItems[0].name
        },
        editorData:item.editorData,
        groups_acp:item.groups_acp,
        modify: {
          user_name: 'admin',
          user_id: 0
      },
      }).then((data)=>{
        req.flash('success', notifyConfig.EDIT_SUCCESS,linkIndex)
   })
    }
  } else { //add
    if (!errors.isEmpty()) { // có lỗi
      res.render(`${folderView}form`, { 
        pageTitle: pageTitleAdd, 
        item, 
        showError:errors.errors 
      });
    } else { // không lỗi
      let groupItems=await groupServer.find({_id:req.body.group},{id:1,name:1})
      // let id = paramsHelpers.getParam(req.params,'id', '')
      item.group={
        id:groupItems[0].id,
        name:groupItems[0].name
      }
      delete item.id
      item.created = {
        user_name: 'admin',
        user_id: 0
      }
      new userServer(item).save().then((result)=>{
        req.flash('success', notifyConfig.ADD_SUCCESS,linkIndex)
      })
    }
  }
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
  await userServer.updateOne({_id:id},data).then(()=>{
        req.flash('warning',notifyConfig.CHANGE_GROUPS_SUCCESS ,linkIndex)
   })

});


// sort
router.get('/sort/:sort_field/:sort_type', async function(req, res, next) {
  req.session.sort_field  = paramsHelpers.getParam(req.params,'sort_field', 'ordering')
  req.session.sort_type = paramsHelpers.getParam(req.params,'sort_type', 'asc')
  res.redirect(linkIndex)
});

router.get('/uploads', async function(req, res, next) {
  res.render(`${folderView}upload`, { 
    pageTitle: pageTitle,
   });
})
//upload 
router.post('/uploads/',upload.single('avatar'), async function (req,res,next){
  
  res.render(`${folderView}upload`, { 
    pageTitle: pageTitle, fileName
   });
 });

module.exports = router;

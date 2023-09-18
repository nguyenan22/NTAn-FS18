var express = require('express');
var router = express.Router();
const schema=require(__path_schemas +'items');
const { models } = require('mongoose');
const ultilsHelpers=require(__path_helpers +'utils')
const paramHelpers=require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
let linkIndex = "/" + systemConfig.prefixAdmin + "/items"
const {body,validationResult}=require('express-validator')
const pageTitle='Item  Manager'
const pageTitleAdd=pageTitle +' Add'
const pageTitleEdit=pageTitle +' Edit'
const notifyConfig=require(__path_configs +'notify')
const util=require('node:util')
/* GET home page. */
router.get('(/status/:status)?', async function(req, res, next) {
  let currentStatus =paramHelpers.getParam(req.params,"status","all")
  await console.log(currentStatus)
  let pagination = {
    totalItems: 1,
    totalItemsPerPage: 2,
    currentPage: 1,
    pageRange:5
}
  if ((currentStatus.length) > 8) {
    if (currentStatus.substr(0,3)==="all") {
      pagination.currentPage=currentStatus.slice(-1)
      currentStatus="all"
    }
    else if (currentStatus.substr(0,6)==="active") {
      pagination.currentPage=currentStatus.slice(-1)
      currentStatus="active"}
    else {
      pagination.currentPage=currentStatus.slice(-1)
      currentStatus="inactive"
    }
  }

  let statusFillters=await ultilsHelpers.createStatusFilter(currentStatus)
  let keyword = paramHelpers.getParam(req.query,'keyword','')
  // console.log(keyword)

// console.log("currentPages=",pagination.currentPage)
// pagination.currentPage = parseInt(paramHelpers.getParam(req.query,'page', 1))
// pagination.currentPage= page
let objwhere = {}
if (currentStatus !== 'all') { objwhere = {status: currentStatus}}
if (keyword !== '') { objwhere.name = new RegExp(keyword, 'i')}

  await schema.count(objwhere).then((data)=>{
    pagination.totalItems = data
  })
  await schema.find(objwhere)
  .sort({ordering: 'asc' })
  .skip(pagination.totalItemsPerPage*(pagination.currentPage-1))
  .limit(pagination.totalItemsPerPage)
  .then(function (models) {
    res.render(__path_views +'pages/item/list', { pageTitle: pageTitle, data:models, statusFillters:statusFillters, currentStatus,keyword,pagination });
    
  })
  .catch(function (err) {
    console.log(err);
  })
  
  // res.render('pages/item/list', { pageTitle: 'Item List Manager', data:models });
  // res.send("Hiển thị")
});

// router.get('/add', function(req, res, next) {
//   res.render('pages/item/add', { pageTitle: 'Item Manager - Add' });
//   // res.send("Thêm phần tử")
// });

router.get('/change-status/:id/:status',async function(req, res, next) {
  let currentStatus = paramHelpers.getParam(req.params,'status', 'active')
  let id = paramHelpers.getParam(req.params,'id', '')
  let status = (currentStatus === 'active') ? "inactive" : 'active'
  await schema.updateOne({_id: id},{ status: status}).then((result)=>{
    req.flash('success',notifyConfig.CHANGE_STATUS_SUCCESS,linkIndex)
      
  })
});

router.post('/change-ordering',async function(req, res, next) {
  let cids = req.body.cid
  let orderings = req.body.ordering
  if(typeof cids === 'object' ){ //thay đổi ordering của nhiều phần tử
    for (let index = 0; index < cids.length; index++) {
      await schema.updateOne({_id: cids[index]},{ ordering: parseInt(orderings[index])})
    }
    req.flash('success',util.format(notifyConfig.CHANGE_ORDERING_MULTI,cids.length),linkIndex)
  }else{ // thay đổi ordering của 1 phần tử
      await schema.updateOne({_id: cids},{ ordering: parseInt(orderings)})
      req.flash('success',notifyConfig.CHANGE_ORDERING,linkIndex)
  }

});

router.post('/save',body('name')
.isLength({ min: 5 })
.withMessage(util.format(notifyConfig.ERROR_NAME,5)),
body('ordering')
.isInt({min:1})
// .isLength({ min: 1 })
.withMessage(util.format(notifyConfig.ERROR_ORDERING,1)),
body('status')
.isLength({ min: 5 })
.custom(async value =>{
  if (await value==="novalue"){
    throw new Error(notifyConfig.ERROR_STATUS)
  }
})
,async function(req, res, next){
console.log(req.body)
const error = validationResult(req);
  let data=[{
    name:req.body.name, 
    ordering: req.body.ordering,
    status:req.body.status,
    create:{
      user_name:"admin",
      user_id:"1"
    }
  }]
  console.log(error.errors)
  if (error.errors.length >=1){
    res.render(__path_views +'pages/item/add', { pageTitle: pageTitleAdd, showError:error.errors });
  }
  else {
    await schema.insertMany(data)
    console.log("Insert Successfully")
    req.flash('success',notifyConfig.ADD_ITEMS,linkIndex)
  }
  

})
router.post('/change-status/:status',async function(req, res, next) {
  let currentStatus = paramHelpers.getParam(req.params,'status', 'active')
  await schema.updateMany({_id:{$in:req.body.cid}},{ status: currentStatus}).then(()=>{
    req.flash('success',util.format(notifyConfig.CHANGE_STATUS_SUCCESS_MULTI,req.body.cid.length),linkIndex)
  })
});



// router.post('/delete',async function(req, res, next) {
//   await schema.deleteMany({_id:{$in:req.body.cid}}).then (() =>{
//     req.flash('warning',util.format(notifyConfig.DELETE_ITEMS_MULTI,req.body.cid.length),linkIndex)
//   })
// });

router.post('/delete',async function(req, res, next) {
  let cids = req.body.cid
  if(typeof cids === 'object' ){ //thay đổi ordering của nhiều phần tử
    await schema.deleteMany({_id:{$in:cids}}).then (() =>{
      req.flash('warning',util.format(notifyConfig.DELETE_ITEMS_MULTI,req.body.cid.length),linkIndex)
    })}
    else {
      await schema.deleteOne({_id:cids})
      console.log("Delete Successfully")
      req.flash('warning',notifyConfig.DELETE_ITEMS,linkIndex)
    }
});

router.get('/delete/:id',async function(req, res, next) {
  let id = paramHelpers.getParam(req.params,'id', '')
  await schema.deleteOne({_id:id})
  console.log("Delete Successfully")
  req.flash('warning',notifyConfig.DELETE_ITEMS,linkIndex)
  
});


router.get('/form/:id',async function(req, res, next) {
  const error = validationResult(req);
  let id = paramHelpers.getParam(req.params,'id', '')
  data=await schema.findOne({_id:id})
  console.log(data)
  res.render(__path_views + 'pages/item/edit', { pageTitle: pageTitleEdit,data,id,showError:error.errors})
})

router.post('/form/:id/save',body('name')
.isLength({ min: 5 })
.withMessage(util.format(notifyConfig.ERROR_NAME,5)),
body('ordering')
.isInt({min:1})
.withMessage(util.format(notifyConfig.ERROR_ORDERING,1)),
body('status')
.isLength({ min: 5 })
.custom(async value =>{
  if (await value==="novalue"){
    throw new Error(notifyConfig.ERROR_STATUS)
  }
})
,async function(req, res, next) {
  let  id = paramHelpers.getParam(req.params,'id', '')
  const error = validationResult(req);
  if (error.errors.length >=1){
    res.render(__path_views + 'pages/item/edit', { pageTitle: pageTitleEdit,data,id, showError:error.errors });
    console.log("test")
  }
  else {
  await schema.updateOne({_id:id},{name:req.body.name,ordering:parseInt(req.body.ordering),status:req.body.status}).then(()=>{
    console.log(req.body)
    req.flash('success',notifyConfig.SAVE_ITEMS,linkIndex)
  })
}})

router.get('/adds', function(req, res, next) {
  const error = validationResult(req);
  if(error.errors.length >=1 ){
    req.flash('success',notifyConfig.ADD_ITEMS,linkIndex)
    console.log(error.errors)
  }
  
});

router.get('/add', function(req, res, next) {
  const error = validationResult(req);
  console.log(error)
  res.render(__path_views + 'pages/item/add', { pageTitle: pageTitleAdd,showError:error.errors});
});

router.put('/:id', async function(req, res, next) {
  let  id = paramHelpers.getParam(req.params,'id', '')
  result=await schema.findById(id)
  console.log(result)
});
module.exports = router;

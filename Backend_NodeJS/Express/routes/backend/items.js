var express = require('express');
var router = express.Router();
const schema=require('../../schemas/items');
const { models } = require('mongoose');
const ultilsHelpers=require('../../helpers/utils')
const paramHelpers=require('../../helpers/getParam')
const systemConfig = require('./../../config/system')
let linkIndex = "/" + systemConfig.prefixAdmin + "/items"
const {body,validationResult}=require('express-validator')
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
    res.render('pages/item/list', { pageTitle: 'Item List Manager', data:models, statusFillters:statusFillters, currentStatus,keyword,pagination });
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
    req.flash('success','Thay đổi trạng thái status thành công',linkIndex)
      
  })
});

router.post('/change-ordering',async function(req, res, next) {
  let cids = req.body.cid
  let orderings = req.body.ordering
  if(typeof cids === 'object' ){ //thay đổi ordering của nhiều phần tử
    for (let index = 0; index < cids.length; index++) {
      await schema.updateOne({_id: cids[index]},{ ordering: parseInt(orderings[index])})
    }
  }else{ // thay đổi ordering của 1 phần tử
      await schema.updateOne({_id: cids},{ ordering: parseInt(orderings)})
  }
  res.redirect(linkIndex)
});

router.post('/save',body('name')
.isLength({ min: 5 })
.withMessage('Nhập lớn hơn 5 kí tự'),
body('ordering')
.isInt({min:1})
// .isLength({ min: 1 })
.withMessage('Chọn 1 số dương'),
body('status')
.isLength({ min: 5 })
.custom(async value =>{
  if (await value==="novalue"){
    throw new Error('Vui lòng chọn một trạng thái')
  }
})
,async function(req, res, next){
console.log(req.body)
const error = validationResult(req);
  let data=[{
    name:req.body.name, 
    ordering: req.body.ordering,
    status:req.body.status,
  }]
  console.log(error.errors)
  if (error.errors.length >=1){
    res.render('pages/item/add', { pageTitle: 'Items Add Manager', showError:error.errors });
  }
  else {
    data.create={
      user_name:"admin",
      user_id:"1"
    }
    await schema.insertMany(data)
    console.log("Insert Successfully")
    req.flash('success','Thêm phần tử thành công',linkIndex)
  }
  

})
router.post('/change-status/:status',async function(req, res, next) {
  let currentStatus = paramHelpers.getParam(req.params,'status', 'active')
  await schema.updateMany({_id:{$in:req.body.cid}},{ status: currentStatus}).then(()=>{
    res.redirect(linkIndex)
  })
});



router.post('/delete',async function(req, res, next) {
  await schema.deleteMany({_id:{$in:req.body.cid}}).then (() =>{
    res.redirect(linkIndex)
  })
});

router.get('/delete/:id',async function(req, res, next) {
  let id = paramHelpers.getParam(req.params,'id', '')
  await schema.deleteOne({_id:id})
  console.log("Delete Successfully")
  req.flash('warning','Xóa thành công',linkIndex)
  
});


router.get('/form/:id',async function(req, res, next) {
  const error = validationResult(req);
  let id = paramHelpers.getParam(req.params,'id', '')
  data=await schema.findOne({_id:id})
  console.log(data)
  res.render('pages/item/edit', { pageTitle: 'Item Edit Manager',data,id,showError:error.errors})
})

router.post('/form/:id/save',body('name')
.isLength({ min: 5 })
.withMessage('Nhập lớn hơn 5 kí tự'),
body('ordering')
.isInt({min:1})
.withMessage('Chọn 1 số dương'),
body('status')
.isLength({ min: 5 })
.custom(async value =>{
  if (await value==="novalue"){
    throw new Error('Vui lòng chọn một trạng thái')
  }
})
,async function(req, res, next) {
  let  id = paramHelpers.getParam(req.params,'id', '')
  const error = validationResult(req);
  if (error.errors.length >=1){
    res.render('pages/item/edit', { pageTitle: 'Items Edit Manager',data,id, showError:error.errors });
  }
  else {
  await schema.updateOne({_id:id},{name:req.body.name,ordering:parent(req.body.ordering),status:req.body.status}).then(()=>{
    console.log(req.body)
    req.flash('success','Lưu thành công',linkIndex)
  })
}})

router.get('/adds', function(req, res, next) {
  const error = validationResult(req);
  if(error.errors.length >=1 ){
    req.flash('success','Thay đổi status thành công',linkIndex)
    console.log(error.errors)
  }
  
});

router.get('/add', function(req, res, next) {
  const error = validationResult(req);
  res.render('pages/item/add', { pageTitle: 'Items Add Manager',showError:error.errors});
});
module.exports = router;

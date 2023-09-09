var express = require('express');
var router = express.Router();
const schema=require('../../schemas/items');
const { models } = require('mongoose');
const ultilsHelpers=require('../../helpers/utils')
const paramHelpers=require('../../helpers/getParam')
const systemConfig = require('./../../config/system')
let linkIndex = "/" + systemConfig.prefixAdmin + "/items"
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
      res.redirect(linkIndex)
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

router.get('/adds', function(req, res, next) {
  req.flash('', 'Thay đổi Status thành công')
  // res.render('pages/items/form', { pageTitle: 'Items Add Manager' });
});

router.get('/add', function(req, res, next) {
  res.render('pages/item/add', { pageTitle: 'Items Add Manager' });
});
module.exports = router;

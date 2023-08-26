var express = require('express');
var router = express.Router();
const schema=require('../../schemas/items');
const { models } = require('mongoose');
const ultilsHelpers=require('../../helpers/utils')
const paramHelpers=require('../../helpers/getParam')
/* GET home page. */
router.get('(/status/:status)?', async function(req, res, next) {
  let currentStatus =paramHelpers.getParam(req.params,"status","all")
  let statusFillters=await ultilsHelpers.createStatusFilter(currentStatus)
  let keyword = paramHelpers.getParam(req.query,'keyword','')
  // console.log(keyword)
  let pagination = {
    totalItems: 1,
    totalItemsPerPage: 2,
    currentPage: 1,
    pageRange:5
}

pagination.currentPage = parseInt(paramHelpers.getParam(req.query,'page', 1))

  let objwhere = {}
if (currentStatus !== 'all') { objwhere = {status: currentStatus}}
if (keyword !== '') { objwhere.name = new RegExp(keyword, 'i')}

  await schema.count(objwhere).then((data)=>{
    pagination.totalItems = data
  })
  console.log(pagination)
  await schema.find(objwhere)
  .sort({ordering: 'asc' })
  .skip(pagination.totalItemsPerPage*(pagination.currentPage-1))
  .limit(pagination.totalItemsPerPage)
  .then(function (models) {
    // console.log(models)
    res.render('pages/item/list', { pageTitle: 'Item List Manager', data:models, statusFillters:statusFillters, currentStatus,keyword,pagination });
  })
  .catch(function (err) {
    console.log(err);
  })
  
  // res.render('pages/item/list', { pageTitle: 'Item List Manager', data:models });
  // res.send("Hiển thị")
});

router.get('/add', function(req, res, next) {
  res.render('pages/item/add', { pageTitle: 'Item Manager - Add' });
  // res.send("Thêm phần tử")
});

// router.get('/edit', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Chỉnh sửa")
// });


// router.get('/delete', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Xóa")
// });

module.exports = router;

var express = require('express');
var router = express.Router();
const schema=require('../../schemas/items');
const { models } = require('mongoose');
const ultilsHelpers=require('../../helpers/utils')
/* GET home page. */
router.get('(/status/:status)?', async function(req, res, next) {
  let currentStatus = req.params.status
  let statusFillters=await ultilsHelpers.createStatusFilter(currentStatus)
  // for (let index = 0; index < statusFillters.length; index++) {
  //   let objwhere = {}   //all
  //   let item = statusFillters[index]
  //   if (item.value !== 'all') {objwhere = {status: item.value}} //active, inactive
  //  await schema.count(objwhere).then((data)=>{
  //     statusFillters[index].count = data
  //   })   
  // }
  let objwhere = {}
  if (currentStatus !== 'all' ) {objwhere = {status: currentStatus}}
  console.log(objwhere)
  await schema.find(objwhere)
  .then(function (models) {
    console.log(models);
    res.render('pages/item/list', { pageTitle: 'Item List Manager', data:models, statusFillters:statusFillters });
  })
  .catch(function (err) {
    console.log(err);
  });
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

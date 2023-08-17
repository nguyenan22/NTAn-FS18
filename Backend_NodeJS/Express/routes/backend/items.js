var express = require('express');
var router = express.Router();
const schema=require('../../schemas/items');
const { models } = require('mongoose');
/* GET home page. */
router.get('/', async function(req, res, next) {

  await schema.find({})
  .then(function (models) {
    let statusFillters = [
      {name: 'ALL', value: 'all',   count: 4,   class: 'default',   link: '#' }, 
      {name: 'ACTIVE', value: 'active',   count: 4,   class: 'success',   link: '#' },
      {name: 'INACTIVE', value: 'inactive',   count: 4,   class: 'default',   link: '#' }
    ]
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

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list-exercise', { pageTitle: 'Item List Manager' });
  // res.send("Hiển thị")
});

// router.get('/add', function(req, res, next) {
//   res.render('video-add', { title: 'video-add' });
//   // res.send("Thêm phần tử")
// });

// router.get('/edit', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Chỉnh sửa")
// });


// router.get('/delete', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send("Xóa")
// });

module.exports = router;

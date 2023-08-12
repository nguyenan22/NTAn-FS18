var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home/home', { pageTitle: 'Home Manager' });
  // res.send("Hiển thị")
});



module.exports = router;

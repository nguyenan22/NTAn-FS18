var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/dashboard/dashboard', { pageTitle: 'Dashboard Manager' });
  // res.send("Hiển thị")
});



module.exports = router;
var express = require('express');
var router = express.Router();
const prefixAdmin=require(__path_configs +'system')

router.use('/items', require('./items'));
router.use('/list', require('./list'));
router.use('/dashboard', require('./dashboard'));
router.use('/home', require('./home'));
router.use('/users', require('./users'));
router.use('/groups', require('./groups'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.use('/items', require('./items'));
router.use('/list', require('./list'));
router.use('/dashboard', require('./dashboard'));
router.use('/home', require('./home'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

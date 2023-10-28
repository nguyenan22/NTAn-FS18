var express = require('express');
var router = express.Router();

router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
router.use('/home', require('./home'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));
module.exports = router;

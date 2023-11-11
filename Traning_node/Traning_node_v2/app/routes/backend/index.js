var express = require('express');
const { path } = require('../../../app');
var router = express.Router();
const middleAuthentication= require(__path_middleware + 'auth')

// router.use('/auth', require('./home'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/dashboard',middleAuthentication, require('./dashboard'));
router.use('/home', require('./home'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));
module.exports = router;

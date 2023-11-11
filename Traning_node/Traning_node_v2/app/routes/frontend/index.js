var express = require('express');
var router = express.Router();
const getUserInfo=require(__path_middleware + 'getUsers')
const getCategoriesInfo=require(__path_middleware + 'getCategories')
const getRandomPostInfo=require(__path_middleware + 'getRandomPost')
router.use('/auth', require('./auth'));
router.use('/',getUserInfo,getCategoriesInfo,getRandomPostInfo, require('./home'));
router.use('/category',getCategoriesInfo, require('./category'));
router.use('/post',getCategoriesInfo, require('./post'));

module.exports = router;

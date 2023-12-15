var express = require('express');
var router = express.Router();
const middleAuthentication= require(__path_middleware + 'auth')
const middleUserInfo= require(__path_middleware + 'getUsers')

// router.use('/auth', require('./home'));
router.use('/items',middleUserInfo,middleUserInfo, require('./items'));
router.use('/groups',middleAuthentication,middleUserInfo, require('./groups'));
router.use('/users',middleAuthentication,middleUserInfo, require('./users'));
router.use('/dashboard',middleUserInfo,middleUserInfo, require('./dashboard'));
router.use('/home',middleAuthentication,middleUserInfo, require('./home'));
router.use('/categories',middleUserInfo,middleUserInfo, require('./categories'));
router.use('/articles',middleUserInfo,middleUserInfo, require('./articles'));
router.use('/categories_product',middleUserInfo,middleUserInfo, require('./categories_product'));
router.use('/articles_product',middleUserInfo,middleUserInfo, require('./articles_product'));
router.use('/discounts_product',middleUserInfo,middleUserInfo, require('./discounts_product'));
router.use('/orders_product',middleUserInfo,middleUserInfo, require('./orders_product'));
router.use('/delivery_product',middleUserInfo,middleUserInfo, require('./delivery_product'));
router.use('/coupon_product',middleUserInfo,middleUserInfo, require('./coupon_product'));
router.use('/slider_product',middleUserInfo,middleUserInfo, require('./slider_product'));
module.exports = router;

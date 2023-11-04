var express = require('express');
var router = express.Router();
const systemConfig = require(__path_configs +'system')
const linkLogin= `/${systemConfig.prefixAdmin}/auth/login`
const linkNoPermission= `/${systemConfig.prefixAdmin}/auth/no-permission`
router.use('/auth', require('./auth'));
router.use('/',(req,res,next) =>{
    if (req.isAuthenticated()){
        if(req.user.userName==='admin') {
            next()
        }else {
            res.redirect(linkNoPermission)
        }
        
    }else {
        res.redirect(linkLogin)
    }
} ,require('./home'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/dashboard', require('./dashboard'));
router.use('/home', require('./home'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));
module.exports = router;

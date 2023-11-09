var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'auth'

// const ItemModels = require(__path_models + colName)
// const utilsHelpers = require(__path_helpers + 'utils')
// const paramsHelpers = require(__path_helpers +'getParam')
const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');
const LocalStrategy = require('passport-local');
const passport = require('passport');
// let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Items Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
const folderNoPermission = __path_views_backend +`pages/${colName}/no-permission`
let layout=__path_views_backend + 'login'
const linkIndex= `/${systemConfig.prefixAdmin}/dashboard`
const linkLogin= `/${systemConfig.prefixAdmin}/auth/login`
const usersModels = require(__path_models + 'users')
const md5=require('md5')
const Swal = require('sweetalert2')
// form
router.get('/login', async function(req, res, next) {
  let item = {userName: '', password: ''}
  let showError = null
    res.render(`${folderView}login`,{
      layout:layout,
      item,showError});
  } 
  // else { //edit
  //   await ItemModels.getItems(id).then((item)=>{
  //   res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError });
  //  })
  // }
);

router.get('/no-permission', async function(req, res, next) {
  let item = {userName: '', password: '',ordering:''}
  let showError = null
    res.render(`${folderNoPermission}`,{
      pageTitle:'No Permission',
      item,showError});
  } 
  // else { //edit
  //   await ItemModels.getItems(id).then((item)=>{
  //   res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, showError });
  //  })
  // }
);


router.get('/logout',function(req, res, next) {
  req.logout(function(err) {
    if (err) {return next(err)}
    res.send(true)
  })
  } 
);

//login
router.post('/login', 
body('username')
  .isLength({ min: 5, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_USERNAME,5,100)),
body('password')
  .isLength({ min: 1, max:100 })
  .withMessage(util.format(notifyConfig.ERROR_PASSWORD,1,100)),

async function(req, res, next) {
  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  console.log(item)
  if (!errors.isEmpty()) {
    console.log(errors.errors)
      res.render(`${folderView}login`, {layout:layout, item, showError: errors.errors
      })
  } else {
    console.log('ok')
    passport.authenticate('local',{
      successRedirect: linkIndex,
      failureRedirect:linkLogin
    })(req,res,next)
    }
  })





module.exports = router;



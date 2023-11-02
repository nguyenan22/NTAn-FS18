var express = require('express');
var router = express.Router();
const util = require('node:util'); 

const { body,validationResult  } = require('express-validator');

const colName = 'auth'

// const ItemModels = require(__path_models + colName)
// const utilsHelpers = require(__path_helpers + 'utils')
// const paramsHelpers = require(__path_helpers +'getParam')
// const systemConfig = require(__path_configs +'system')
const notifyConfig = require(__path_configs +'notify');

// let linkIndex = `/${systemConfig.prefixAdmin}/${colName}`  
let pageTitle = `Items Manager`
let pageTitleAdd = pageTitle + ' Add'
let pageTitleEdit = pageTitle + ' Edit'
const folderView = __path_views_backend +`pages/${colName}/`
let layout=__path_views_backend + 'login'


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
      res.render(`${folderView}login`, {layout:layout, item, showError: errors.errors
      })
  } else {
    // let message = (taskCurrent == 'add') ? notifyConfig.ADD_SUCCESS : notifyConfig.EDIT_SUCCESS
    // ItemModels.saveItems(item,{task: taskCurrent}).then((result)=>{
    //   req.flash('success', message , linkIndex)
    console.log('ok')
    }
  })



// sort



module.exports = router;



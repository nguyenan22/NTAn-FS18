var express = require('express');
var router = express.Router();
const articlesModels = require(__path_models + 'articles')
const categoriesModels = require(__path_models + 'categories')
const itemsModels = require(__path_models + 'items')
const groupsModels = require(__path_models + 'groups')
const usersModels = require(__path_models + 'users')
const colName ='dashboard'
const folderView = __path_views_backend +`pages/${colName}/`
const {countCollection} =  require(__path_helpers + 'utils')
const pageTitle='Dashboard Manager'
/* GET home page. */
router.get('/',async function(req, res, next) {
  let collectModel={
    'Items': itemsModels,
    'Articles': articlesModels,
    'Categories': categoriesModels,
    'Groups': groupsModels,
    'Users': usersModels

  }
  collectModel = await countCollection(Object.keys(collectModel),collectModel)
  console.log(collectModel);
  res.render(`${folderView}index`, { 
    pageTitle: pageTitle,
    count:collectModel
   });
});

module.exports = router;

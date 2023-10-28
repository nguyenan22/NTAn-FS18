var express = require('express');
var router = express.Router();
const articlesService = require(__path_shemas + 'articles')
const categoriesService = require(__path_shemas + 'categories')
const itemsService = require(__path_shemas + 'items')
const groupsService = require(__path_shemas + 'groups')
const usersService = require(__path_shemas + 'users')
const colName ='dashboard'
const folderView = __path_views_backend +`pages/${colName}/`
const {countCollection} =  require(__path_helpers + 'utils')
const pageTitle='Dashboard Manager'
/* GET home page. */
router.get('/',async function(req, res, next) {
  let collectModel={
    'Items': itemsService,
    'Articles': articlesService,
    'Categories': categoriesService,
    'Groups': groupsService,
    'Users': usersService

  }
  collectModel = await countCollection(Object.keys(collectModel),collectModel)
  console.log(collectModel);
  res.render(`${folderView}index`, { 
    pageTitle: pageTitle,
    count:collectModel
   });
});

module.exports = router;

var express = require('express');
var router = express.Router();
const categoriesService = require(__path_shemas + 'categories')
const articlesService = require(__path_shemas + 'articles')
const paramsHelpers = require(__path_helpers +'getParam')
// const articlesService = require(__path_shemas + 'articles')
// const categoriesService = require(__path_shemas + 'categories')
// const itemsService = require(__path_shemas + 'items')
// const groupsService = require(__path_shemas + 'groups')
// const usersService = require(__path_shemas + 'users')
const colName ='category'
const folderView = __path_views_frontend +`pages/${colName}/`
// const {countCollection} =  require(__path_helpers + 'utils')
// const pageTitle='Home'
const layout= __path_views_frontend +'frontend'
/* GET home page. */
router.get('/',async function(req, res, next) {

  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:false, slide_bar:false,
   });
});

router.get('/:slug',async function(req, res, next) {
  let category =await categoriesService.find({status:'active'}).sort({ordering:'asc'})
  let slugItem = paramsHelpers.getParam(req.params,'slug', '')
  let dataCategory = await categoriesService.find({slug:slugItem,status:'active'}).sort({ordering:'asc'})
  let dataArticle=await articlesService.find({status:'active',categoryId:dataCategory[0].id})
  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:false, slide_bar:false,
    dataArticle,
    dataCategory,
    category
   });
});

module.exports = router;

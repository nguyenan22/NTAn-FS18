var express = require('express');
var router = express.Router();
const categoriesModels = require(__path_models + 'categories')
const articlesModels = require(__path_models + 'articles')
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
  // let category =await categoriesService.find({status:'active'}).sort({ordering:'asc'})
  let slugItem = paramsHelpers.getParam(req.params,'slug', '')
  let dataCategory = await categoriesModels.find({slug:slugItem,status:'active'}).sort({ordering:'asc'})
  let dataArticle=await articlesModels.find({status:'active',categoryId:dataCategory[0].id}).limit(2)
  if (dataArticle.length < 2) {
    var hidden='hidden'
  }
  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:false, slide_bar:false,
    dataArticle,
    dataCategory,
    hidden
   });
});

router.get('/:slug/:page/:item_per_page',async function(req, res, next) {
  // let limitItem= paramsHelpers.getParam(req.params,'item_per_page', '')
  let slugItem = paramsHelpers.getParam(req.params,'slug', '')
  let pageItem = paramsHelpers.getParam(req.params,'page', '')
  let dataCategory = await categoriesModels.find({slug:slugItem,status:'active'}).sort({ordering:'asc'})
  let dataArticleSkip=await articlesModels.find({status:'active',categoryId:dataCategory[0].id}).skip(pageItem)
  if (dataArticleSkip.length < parseInt(limitItem)) {
      limitItem=dataArticleSkip.length
  }
  let dataArticle=await articlesModels.find({status:'active',categoryId:dataCategory[0].id}).skip(pageItem)
  res.json(dataArticle)

});

module.exports = router;

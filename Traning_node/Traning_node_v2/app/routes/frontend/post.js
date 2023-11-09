var express = require('express');
var router = express.Router();
// const articlesService = require(__path_shemas + 'articles')
// const categoriesService = require(__path_shemas + 'categories')
// const itemsService = require(__path_shemas + 'items')
// const groupsService = require(__path_shemas + 'groups')
// const usersService = require(__path_shemas + 'users')
const colName ='post'
const paramsHelpers = require(__path_helpers +'getParam')
const folderView = __path_views_frontend +`pages/${colName}/`
const categoriesService = require(__path_shemas + 'categories')
const articlesService = require(__path_shemas + 'articles')
// const {countCollection} =  require(__path_helpers + 'utils')
// const pageTitle='Home'
const layout= __path_views_frontend +'frontend'
/* GET home page. */
router.get('/',async function(req, res, next) {

  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:true
   });
});

router.get('/:slug',async function(req, res, next) {
  console.log('test')
  let category =await categoriesService.find({status:'active'}).sort({ordering:'asc'})
  let slugItem = paramsHelpers.getParam(req.params,'slug', '')
  let dataArticle=await articlesService.find({status:'active',slug:slugItem})
  let dataArticles=await articlesService.find({status:'active',categoryId:dataArticle[0].categoryId})
  let dataCategory = await categoriesService.find({_id:dataArticle[0].categoryId,status:'active'}).sort({ordering:'asc'})
  let dataRelavent= await articlesService.find({slug: {$not:{$in:slugItem}},categoryId:dataArticle[0].categoryId})

  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:false, slide_bar:false,
    dataArticle,dataCategory,category,dataRelavent,dataArticles
   });
});

router.get('/:slugCategory/:id',async function(req, res, next) {
  let limitItem=1
  let slugItem = paramsHelpers.getParam(req.params,'slugCategory', '')
  let idItem = paramsHelpers.getParam(req.params,'id', '')
  let category =await categoriesService.find({status:'active',slug:slugItem}).sort({ordering:'asc'})
  let dataArticle=await articlesService.find({status:'active',categoryId:category[0]._id}).limit(limitItem).skip((idItem) * limitItem)
  res.json(dataArticle)
})


module.exports = router;

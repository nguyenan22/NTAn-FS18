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
const categoriesModels = require(__path_models + 'categories')
const articlesModels = require(__path_models + 'articles')
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
  let slugItem = paramsHelpers.getParam(req.params,'slug', '')
  let dataArticle=await articlesModels.find({status:'active',slug:slugItem})
  let dataArticles=await articlesModels.find({status:'active',categoryId:dataArticle[0].categoryId})
  let dataCategory = await categoriesModels.find({_id:dataArticle[0].categoryId,status:'active'}).sort({ordering:'asc'})
  let dataRelavent= await articlesModels.find({slug: {$not:{$in:slugItem}},categoryId:dataArticle[0].categoryId})

  res.render(`${folderView}index`, { 
    layout:layout,
    top_post:false, slide_bar:false,
    dataArticle,dataCategory,dataRelavent,dataArticles
   });
});

router.get('/:slugCategory/:id',async function(req, res, next) {
  let limitItem=1
  let slugItem = paramsHelpers.getParam(req.params,'slugCategory', '')
  let idItem = paramsHelpers.getParam(req.params,'id', '')
  let category =await categoriesModels.find({status:'active',slug:slugItem}).sort({ordering:'asc'})
  let dataArticle=await articlesModels.find({status:'active',categoryId:category[0]._id}).limit(limitItem).skip((idItem) * limitItem)
  res.json(dataArticle)
})


module.exports = router;

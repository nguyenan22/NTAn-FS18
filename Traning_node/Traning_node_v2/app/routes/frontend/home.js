var express = require('express');
var router = express.Router();
const categoriesService = require(__path_shemas + 'categories')
// const categoriesService = require(__path_shemas + 'categories')
// const itemsService = require(__path_shemas + 'items')
// const groupsService = require(__path_shemas + 'groups')
// const usersService = require(__path_shemas + 'users')
const colName ='home'
const articlesModels = require(__path_models + 'articles')
const folderView = __path_views_frontend +`pages/${colName}/`
// const {countCollection} =  require(__path_helpers + 'utils')
const pageTitle='Home'
const layout= __path_views_frontend +'frontend'
/* GET home page. */
router.get('/',async function(req, res, next) {
  let category =await categoriesService.find({status:'active'})
                                        .sort({ordering:'asc'})
  let specialItem,latestItem,mostPopularItem=[]
  await articlesModels.listItemsFrontEnd(null,{task:"special-item"}).then ((item) =>{
    specialItem=item
  })
  await articlesModels.listItemsFrontEnd(null,{task:"latest-item"}).then ((item) =>{
    latestItem=item
  })
  await articlesModels.listItemsFrontEnd(null,{task:"mostPopular-item"}).then ((item) =>{
    mostPopularItem=item
  })

  res.render(`${folderView}index`, { 
    
    layout:layout,
    top_post:true,slide_bar:true,
    items:specialItem,
    category,latestItem,mostPopularItem
   });
});


module.exports = router;

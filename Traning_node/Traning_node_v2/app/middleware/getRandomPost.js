const articlesModels = require(__path_models + 'articles')
module.exports= async (req,res,next) =>{
    await articlesModels.listItemsFrontEnd(null,{task:"mostPopular-item"}).then ((item) =>{
         mostPopularItem=item
      })
    res.locals.mostPopularItem=mostPopularItem
    next()
    }
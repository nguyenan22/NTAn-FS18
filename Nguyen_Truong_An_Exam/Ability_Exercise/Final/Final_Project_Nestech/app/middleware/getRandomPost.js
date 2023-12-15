const articlesServices = require(__path_services + 'articles')
module.exports= async (req,res,next) =>{
    await articlesServices.listItemsFrontEnd(null,{task:"mostPopular-item"}).then ((item) =>{
         mostPopularItem=item
      })
    res.locals.mostPopularItem=mostPopularItem
    next()
    }
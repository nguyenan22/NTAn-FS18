const categoriesService = require(__path_shemas + 'categories')
module.exports= async (req,res,next) =>{
    let category =await categoriesService.find({status:'active'}).sort({ordering:'asc'})
    res.locals.category=category
    next()
    }
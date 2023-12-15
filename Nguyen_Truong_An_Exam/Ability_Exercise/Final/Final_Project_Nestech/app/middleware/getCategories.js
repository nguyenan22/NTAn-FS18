const categoriesModels = require(__path_models + 'categories')
module.exports= async (req,res,next) =>{
    let category =await categoriesModels.find({status:'active'}).sort({ordering:'asc'})
    res.locals.category=category
    next()
    }

module.exports=(req,res,next) =>{
    let userInfo={}
        if (req.isAuthenticated()){
            console.log(req.user.name)
            userInfo = req.user
        }
        res.locals.userInfo=userInfo
        next()
    }
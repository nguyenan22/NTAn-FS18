const systemConfig = require(__path_configs +'system')
const stringHelpers = require(__path_helpers +'string');
const linkLogin= `/${systemConfig.prefixAdmin}/auth/login`
const linkNoPermission=stringHelpers.formatLink(`/${systemConfig.prefixFrontend}/auth/no-permission`) 
module.exports=(req,res,next) =>{
        if (req.isAuthenticated()){
            if(req.user.userName==='admin') {
                console.log('admin123')
                next()
            }else {
                console.log('no admin')
                res.redirect(linkNoPermission)
            }
            
        }else {
            res.redirect(linkLogin)
        }}
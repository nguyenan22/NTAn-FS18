// const {validator} = require(__path_validates +'items.validate')
// const {validator_users} = require(__path_validates +'users.validate')
const ErrorResponse= require('../ultis/errorResponse')
module.exports={
    validateReq: async(validator,req,res,next) => {
        const err= await validator(req)
        if(Object.keys(err).length > 0) {
             next(new ErrorResponse(400,err))
             return true
        }
        return  false
    }
}
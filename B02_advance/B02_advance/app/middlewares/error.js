var ErrorResponse =require('../ultis/errorResponse')
const {ERROR_CASTERROR}=require('../configs/notify')
function errorHandler (err, req, res, next) {
    console.log(err.name)
    let error={...err}
    console.log(err)
    if (err.name==='CastError'){
        let message=ERROR_CASTERROR
        error=new ErrorResponse(404,message)
    }
    res.status(error.statusCode || 500).json({
        success:false,
        message: error.message || 'Server Error'
    })
  }
  module.exports=errorHandler
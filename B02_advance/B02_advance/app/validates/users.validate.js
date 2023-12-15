

const util      = require('util')
const notify    = require(__path_configs + 'notify')
const options   = {
    username: {min: 5, max: 15},
    password: {min: 5, max: 10},
    enum     : ['user','publisher']

}
module.exports = {
    validator: (req)=>{
        // name
        req.checkBody('username', util.format(notify.ERROR_NAME, options.username.min,options.username.max))
            .isLength({ min: options.username.min, max: options.username.max })

        // email
        req.checkBody('email', util.format(notify.ERROR_EMAIL))
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        req.checkBody('role', util.format(notify.ERROR_ROLE))
            .isIn(options.enum)

        req.checkBody('password', util.format(notify.ERROR_PASSWORD,options.password.min,options.password.max))
            .isLength({ min: options.password.min, max: options.password.max })

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        let message = {}
        errors.map((val,ind)=>{
            message[val.param] = val.msg
        })
        return message
    }
}
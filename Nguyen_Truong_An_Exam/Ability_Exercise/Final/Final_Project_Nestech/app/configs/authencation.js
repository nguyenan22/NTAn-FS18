const usersServices = require(__path_services + 'users')
const LocalStrategy = require('passport-local');
const md5=require('md5')
module.exports= (passport) =>{
    passport.use(new LocalStrategy( function verify(username,password,cb){
      usersServices.getItemsUserName(username,null).then((user) =>{
          console.log(user)
          let data = user[0]
          if (!data) {
            console.log('Vui lòng nhập lại!')
          }
          else {
            if (md5(password) !== data.password) {
              console.log('Vui lòng nhập lại')
              return cb(null,false)
            }
            else {
              console.log('Đăng nhập OK')
              return cb(null,data)
            }
          }
        })
        // return (null,true)
      }))
      passport.serializeUser(function (user,cb) {
        cb(null,user._id)
      })
      passport.deserializeUser(function(id,cb){
        usersServices.getItems(id,null).then((user) =>{
          return cb(null,user)
        })
      })
}
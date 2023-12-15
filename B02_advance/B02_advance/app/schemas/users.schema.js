const mongoose =require('mongoose')
const databaseConfig=require(__path_configs + 'database')
const bcrypt=require('bcrypt')

let schema = new mongoose.Schema({
    username:String,
    email:String,
    role:String,
    password:String
})
schema.pre('save',function(next) {
    const salt=bcrypt.genSaltSync(10)
    this.password=bcrypt.hashSync(this.password,salt)
    next()
})
module.exports=mongoose.model(databaseConfig.col_users,schema)
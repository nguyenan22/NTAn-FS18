const mongoose =require('mongoose')
const databaseConfig=require(__path_configs + 'database')


let schema = new mongoose.Schema({
    id:String,
    name:String,
    status:String
})
console.log(databaseConfig.col_items)
module.exports=mongoose.model(databaseConfig.col_items,schema)
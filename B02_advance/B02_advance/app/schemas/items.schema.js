const mongoose =require('mongoose')
const databaseConfig=require(__path_configs + 'database')


let schema = new mongoose.Schema({
    name:String,
    description:String,
    careers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'careers.schema',
        require:true
    }],
    type:Array,
    local:String,
    web:String,
    address:String,
    phone:Number,
    email:String
})
console.log(databaseConfig.col_items)
module.exports=mongoose.model(databaseConfig.col_items,schema)
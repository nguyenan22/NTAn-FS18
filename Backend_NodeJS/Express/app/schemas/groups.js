const mongoose=require('mongoose')
const databaseConfig=require(__path_configs +'/database')
//Create object
const kittySchema = new mongoose.Schema({
    name: String,
    status:String,
    ordering:Number,
    editor:String,
    create: {
      user_name: String,
      user_id:Number
    },
    modify:{
      user_name: String,
      user_id:Number
    }
  },
  {timestamps:true});


module.exports=mongoose.model(databaseConfig.COL_GROUPS, kittySchema)


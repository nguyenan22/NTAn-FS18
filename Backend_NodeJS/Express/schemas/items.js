const mongoose=require('mongoose')

//Create object
const kittySchema = new mongoose.Schema({
    name: String,
    status:String,
    ordering:Number,
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


module.exports=mongoose.model('objectTable', kittySchema)


const mongoose=require('mongoose')

//Create object
const kittySchema = new mongoose.Schema({
    name: String,
    status:String,
    ordering:Number
  });


module.exports=mongoose.model('objectTable', kittySchema)


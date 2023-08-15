const mongoose=require('mongoose')

//Create object
const kittySchema = new mongoose.Schema({
    name: String,
    age:String,
    sex:String,
    phone:String
  });


module.exports=mongoose.model('objectTable', kittySchema)


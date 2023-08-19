const mongoose=require('mongoose')

//Create object
const kittySchema = new mongoose.Schema({
    name: String,
    status:String,
    odering:String
  });


module.exports=mongoose.model('objectTable', kittySchema)


const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')

const schema = new mongoose.Schema({ 
    fullName: String, 
    userName:String,
    password:String,
    email:String,
    avatar: String,
    group:{
      id: String,
      name: String
    },
    status: String,
    ordering: Number,
    editorData:String,
    created: {
        user_name: String,
        user_id: Number
      },
      modify: {
        user_name: String,
        user_id: Number
      }
},
{ timestamps: true });


module.exports = mongoose.model(databaseConfig.COL_USERS, schema);

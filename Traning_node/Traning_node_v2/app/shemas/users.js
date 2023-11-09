const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
const bcrypt = require('bcrypt');

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
        user_id: String
      },
      modify: {
        user_name: String,
        user_id: String
      }
},
{ timestamps: true });

schema.pre('save', function (next){
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
})

module.exports = mongoose.model(databaseConfig.COL_USERS, schema);


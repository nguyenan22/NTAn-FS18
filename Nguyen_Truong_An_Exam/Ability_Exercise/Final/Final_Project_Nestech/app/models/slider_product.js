const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
  name: String, 
  link: String,
  status: String,
  ordering: Number,
  thumb: String,
  headertitle: String,
  title: String,
  textbutton: String,
  description: String,
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


module.exports = mongoose.model(databaseConfig.COL_SLIDER_PRODUCTION, schema);



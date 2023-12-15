const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')

const schema = new mongoose.Schema({ 
  province: String, 
  cost: Number,
  status: String,
  ordering: Number,
  modify: {
    user_name: String,
    user_id: Number
  },
  created: {
    user_name: String,
    user_id: Number
  },
},
{ timestamps: true });


module.exports = mongoose.model(databaseConfig.COL_DELIVERY_PRODUCTION, schema);

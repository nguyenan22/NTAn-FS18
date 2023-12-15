const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
  name: String,
  couponcode: String,
  description: String,
  couponValue: {
      unit: String,
      value: Number,
      minTotal: Number,
      maxDown: Number
  },
  ordering: Number,
  status: String,
  turnused: {
      type: Number,
      default: 0,
  },
  time: String,
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


module.exports = mongoose.model(databaseConfig.COL_COUPON_PRODUCTION, schema);



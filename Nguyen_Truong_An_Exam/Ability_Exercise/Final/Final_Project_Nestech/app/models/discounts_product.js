const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
    name: String,
    description: String,
    discountValue: {
        unit: String,
        value: Number,
    },
    ordering: Number,
    status: String,
    time: String,
    expired: Boolean,
    productList: [
        { type:mongoose.Schema.Types.ObjectId, ref: 'articles_product' }
    ],
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


module.exports = mongoose.model(databaseConfig.COL_DISCOUNT_PRODUCTION, schema);



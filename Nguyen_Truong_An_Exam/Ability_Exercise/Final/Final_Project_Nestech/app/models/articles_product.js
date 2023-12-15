const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
  name: String,
  price: Number,
  discountProduct: [
      { type:mongoose.Schema.Types.ObjectId, ref: 'discounts_product' }
  ],
  description: String,
  quantity: Number,
  slug: String,
  status: String,
  ordering: Number,
  thumb: Array,
  dailydeals: {
      type: Boolean,
      default: false
  },
  fearturedproduct: {
      type: Boolean,
      default: false
  },
  content: String,
  category: { type:mongoose.Schema.Types.ObjectId, ref: 'categories_products' },
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


module.exports = mongoose.model(databaseConfig.COL_ARTICLES_PRODUCTION, schema);



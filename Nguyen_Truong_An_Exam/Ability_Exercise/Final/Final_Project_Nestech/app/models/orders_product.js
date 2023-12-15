const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
    name: String,
    trackingCode: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    address: {
        info: String,
        province:{type: mongoose.Schema.Types.ObjectId, ref: 'delivery'} 
    },
    phoneNumber: String,
    couponCode: String,
    status: {
        type: String,
    },
    productList: String,
    couponValue: Number,
    costShip: Number,
    priceProduct: Number,
    totalMoney: Number,
    notes: String,
},
{ timestamps: true });


module.exports = mongoose.model(databaseConfig.COL_ORDER_PRODUCTION, schema);


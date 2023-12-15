const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')

const schema = new mongoose.Schema({ 
    name: String, 
    status: String,
    ordering: Number,
    created: {
        user_name: String,
        user_id: Number
      },
      modify: {
        user_name: String,
        user_id: Number
      },
      slug:String,
      articles:[
        {type:mongoose.Schema.Types.ObjectId,ref:'articles'}
      ],
},
{ timestamps: true });


module.exports = mongoose.model(databaseConfig.COL_CATEGORIES, schema);

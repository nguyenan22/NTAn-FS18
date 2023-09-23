const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')

const schema = new mongoose.Schema({ 
    name: String, 
    status: String,
    ordering: Number,
    groups_acp: String,
    description:String,
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


module.exports = mongoose.model(databaseConfig.COL_GROUPS, schema);

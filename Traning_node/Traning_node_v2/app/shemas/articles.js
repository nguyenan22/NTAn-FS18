const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database')
// const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({ 
    title: String, 
    slug:String,
    thumb: String,
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
      },
      categoryId:String,
      categories:[
        {type:mongoose.Schema.Types.ObjectId,ref:'categories'}
      ],
      position:String

},
{ timestamps: true });


module.exports = mongoose.model(databaseConfig.COL_ARTICLES, schema);


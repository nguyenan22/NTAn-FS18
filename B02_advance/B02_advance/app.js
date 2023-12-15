var createError   = require('http-errors');
var express       = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
var bodyParser = require('body-parser')
var app = express();
var morgan = require('morgan')
var colors = require('colors');
var validator=require('express-validator')
app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(validator())

const pathConfig        = require('./path');
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';

global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_models    = __path_app + pathConfig.folder_models + '/';
global.__path_routers   = __path_app + pathConfig.folder_routers + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';
global.__path_validates   = __path_app + pathConfig.folder_validates + '/';
global.__path_middlewares   = __path_app + pathConfig.folder_middlewares + '/';



const systemConfig    = require(__path_configs + 'system');
const databaseConfig  = require(__path_configs + 'database');
const errorHandler  = require(__path_middlewares + 'error');

// Local variable
app.locals.systemConfig = systemConfig;

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.ubyknfq.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`)
  .then(()=> {
    console.log('Database connected'.blue);
    console.log(databaseConfig.database)
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// Setup router
app.use('/api/v1', require(__path_routers+'index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//error middlewares handle
app.use(errorHandler)
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.end('Error App');
// });

module.exports = app;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash-notification');
const session = require('express-session');
const moment = require('moment');

const pathConfigs = require('./path');
global.__base = __dirname + '/';
global.__path_app = __base + pathConfigs.folder_app + '/';
global.__path_configs = __path_app + pathConfigs.folder_configs +'/';
global.__path_routes = __path_app + pathConfigs.folder_routes + '/';
global.__path_views = __path_app + pathConfigs.folder_views + '/';
global.__path_helpers = __path_app + pathConfigs.folder_helpers + '/';
global.__path_shemas = __path_app + pathConfigs.folder_shemas +'/';
global.__path_public = __base + pathConfigs.folder_public +'/';
global.__path_uploads =__path_public +  pathConfigs.folder_uploads +'/';

const systemConfig = require(__path_configs +'system')
const databaseConfig = require(__path_configs +'database')

mongoose.connect(`mongodb+srv://${databaseConfig.USER_NAME}:${databaseConfig.PASSWORD}@${databaseConfig.DATABASE_NAME}`);
var db = mongoose.connection
          db.on("error", () => {console.log("Connect Err")});
          db.on("connected", () => {console.log("Connected successfully!")});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout',__path_views + 'backend');
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'csjbca',
  resave: false,
  saveUninitialized: true
}))
app.use(flash(app,{
    viewName:__path_views+ 'elements/notify'
}));

// setup router
app.locals.systemConfig = systemConfig
app.locals.moment = moment;
app.use(`/${systemConfig.prefixAdmin}`, require(__path_routes +'/backend/index'));
// app.use('/', require('./routes/frontend/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(__path_views + 'pages/error', { pageTitle: 'Page Not Found' });
});

module.exports = app;

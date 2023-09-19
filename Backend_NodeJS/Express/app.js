var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const mongoose=require('mongoose')
const flash = require('express-flash-notification');
const session = require('express-session');
const toastr = require('express-toastr')
const pathConfigs=require('./path')
// var indexRouter = ;
// var usersRouter = ;
// var videoRouter = ;


global.__base=__dirname +'/';
global.__path_app=__base + pathConfigs.folder_app + '/';
global.__path_configs=__path_app + pathConfigs.folder_configs + '/';
global.__path_routes=__path_app + pathConfigs.folder_routes + '/';
global.__path_views=__path_app + pathConfigs.folder_views + '/';
global.__path_helpers=__path_app + pathConfigs.folder_helpers + '/';
global.__path_schemas=__path_app + pathConfigs.folder_schemas + '/';
const systemConfig=require(__path_configs +'system')
const databaseConfig=require(__path_configs +'database')
// Connect MongoDB
mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.ubyknfq.mongodb.net/${databaseConfig.databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err));

var app = express();


var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', __path_views +'list-exercise');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash(app,{
  viewName:__path_views +'elements/notify'
}));

app.use(toastr());

// Router
app.locals.systemConfig=systemConfig
app.use(`/${systemConfig.prefixAdmin}`, require(__path_routes + 'backend/index'));
// app.use('/admin', require('./routes/index'));
// app.use('/items', require('./routes/items'));
// app.use('/users', require('./routes/users'));
// app.use('/list', require('./routes/backend/list'));
// app.use('/admin123', require('./routes/admin'));

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
  res.render(__path_views +'pages/error',{pageTitle:'Page Not Found'});
});

module.exports = app;

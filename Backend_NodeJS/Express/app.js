var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = ;
// var usersRouter = ;
// var videoRouter = ;

var app = express();


var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'list-exercise');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.use('/', require('./routes/backend/index'));
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
  res.render('error');
});

module.exports = app;

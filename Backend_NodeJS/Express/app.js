var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const systemConfig=require('./config/system')
const mongoose=require('mongoose')
const flash = require('express-flash-notification');
const session = require('express-session');
// var indexRouter = ;
// var usersRouter = ;
// var videoRouter = ;

// Connect MongoDB
mongoose.connect('mongodb+srv://nguyenan22021996:2411996An@cluster0.ubyknfq.mongodb.net/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err));

//Create object
// const kittySchema = new mongoose.Schema({
//     name: String,
//     age:String,
//     sex:String,
//     phone:String
//   });

// const Kitten = mongoose.model('objectTable', kittySchema);
// const silence = new Kitten({ name: 'An',age:18,sex:'Male',phone:'012345678' });
// silence.save()

// Find dữ liệu




var app = express();


var expressLayouts = require('express-ejs-layouts');
// const { default: mongoose } = require('mongoose');
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
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash(app));

// Router
app.locals.systemConfig=systemConfig
// console.log(systemConfig.prefixAdmin)
app.use(`/${systemConfig.prefixAdmin}`, require('./routes/backend/index'));
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
  res.render('pages/error',{pageTitle:'Page Not Found'});
});

module.exports = app;

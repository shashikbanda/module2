var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require("cookie-session")
var bodyParser = require('body-parser');
var multer = require('multer');
// require('dotenv').load();

var knex = require('./db/knex');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');


var fs= require('fs')
var app = express();

var routesIndex = require('./routes/index')
var routesUpload = require('./routes/upload');
var routesAuth = require('./routes/auth');
var routesPublic = require('./routes/public')
var routesPrivate = require('./routes/private');
var routesSignup = require('./routes/signup');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("abcdefghijklmnopqrstuvwxyz"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ["key1","key2"]
}));
app.use(routesAuth.passport.initialize());
app.use(routesAuth.passport.session());

app.use('/', routesIndex);
app.use('/upload', routesUpload);
app.use('/auth', routesAuth.router);
app.use('/public', routesPublic);
app.use('/private', routesPrivate);
app.use('/signup', routesSignup);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, function(){
  console.log("listen on port 3000")
})

module.exports = app;
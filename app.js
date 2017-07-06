/**
 * Created by nilu on 14/06/17.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var passport = require('passport');


var configDb = require('./src/server/config/database');
var configPassport = require('./src/server/config/passport');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(configDb.database)
  .then(() => console.log('connection successful'))
.catch((err) => console.error(err));

// Routers in the server
var routesUser = require('./src/server/routes/user');

//Creates express server
var app = express();



app.use(logger('dev'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/user', routesUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("Error", err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

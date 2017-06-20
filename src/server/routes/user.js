/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var configPassport = require('../config/passport');
var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var user = require("../controllers/UserController.js");
var trip = require("../controllers/AddTripController.js");

// route for login action
//router.post('/login', auth.doLogin);

router.post('/signup', user.create);
router.post('/signin', user.authenticate);
router.get('/activation', user.)

router.get('/getall', jwt({
  secret: configPassport.secret
}), user.getall);

router.post('/addtrip', jwt({
  secret: configPassport.secret
}), trip.create);

router.get('/mytrip',jwt({
  secret: configPassport.secret
}), trip.mytrip);

router.get('/', function (req, res, next) {
  res.send('Express REST API');
});

module.exports = router;

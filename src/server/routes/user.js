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

router.post('/signup', user.createTemp);
router.post('/signin', user.authenticate);
router.post('/email-verification', user.confirmTempUser);

router.post('/updateProfile', jwt({
  secret: configPassport.secret}),
  user.onUpdateProfile);

router.post('/reset-password', user.resetPassword);
router.post('/reset-password-change', user.resetPasswordChange);


// router.post('/uploadImage',jwt({
//     secret: configPassport.secret}),
//   user.onUploadImage);
router.get('/getall', jwt({
  secret: configPassport.secret
}), user.getall);

router.post('/getProfile', jwt({
  secret: configPassport.secret
}), user.getProfile);

router.post('/updateTrip', jwt({
    secret: configPassport.secret}),
  trip.updateTrip);

router.post('/addtrip', jwt({
  secret: configPassport.secret
}), trip.addtrip);

router.get('/mytrip',jwt({
  secret: configPassport.secret
}), trip.mytrip);

router.get('/mytrips',jwt({
  secret: configPassport.secret
}), trip.mytrips);

router.post('/gettrip',jwt({
  secret: configPassport.secret
}), trip.gettrip);

router.post('/deletetrip',jwt({
  secret: configPassport.secret
}), trip.deletetrip);

router.get('/', function (req, res, next) {
  res.send('Express REST API');
});

router.post('/uploadProfileImage', jwt({
  secret: configPassport.secret
}), user.uploadProfileImage);

module.exports = router;

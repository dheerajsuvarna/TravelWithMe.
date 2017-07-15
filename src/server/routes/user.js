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
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../../models/Chat');

// route for login action
//router.post('/login', auth.doLogin);
server.listen(4000);
// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});

/* GET ALL CHATS */
router.get('/:room', function(req, res, next) {
  Chat.find({ room: req.params.room }, function (err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

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

router.post('/addtrip', jwt({
  secret: configPassport.secret
}), trip.addtrip);

router.get('/searchtrips',jwt({
  secret: configPassport.secret
}), trip.searchtrips);

router.get('/mytrips',jwt({
  secret: configPassport.secret
}), trip.mytrips);

router.get('/', function (req, res, next) {
  res.send('Express REST API');
});

router.post('/uploadProfileImage', jwt({
  secret: configPassport.secret
}), user.uploadProfileImage);

router.post('/jointrip', jwt({
  secret: configPassport.secret
}), trip.joinTrip);

module.exports = router;

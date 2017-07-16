var User = require('../../models/UserModel');
var Chat = require('../../models/Chat');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Trip = require('../../models/TripModel');



module.exports = {


  getAll: function (req, res) {

    console.log(req.user._doc);


  var room=req.params.room;
  room =  room.slice(1,room.lenght);

    Trip.findOne({$or:[{_id: room,joinUser:req.user._doc._id},
      {_id: room,user:req.user._doc._id}]})
      .then(function (trip){
        if(trip) {
          console.log(trip);

          Chat.find({room: room}, function (err, chats) {
            if (err) return next(err);

            res.json(chats);
          });
        }
        else{
          return res.status(401).send('User is not owner or joined!');
        }
        })},

  addMessage: function (req, res, next) {
    Trip.findOne({$or:[{_id: req.body.message.room,joinUser:req.body.user},
      {_id: req.body.message.room,user:req.body.user._id}]})
      .then(function (trip){
     if(trip)
     {
       Chat.create(req.body.message, function (err, post) {
         if (err) return next(err);
         res.json(post);
       });
     }
     else{
       return res.status(401).send('User is not owner or joined!');
     }
    })
      .catch(function (err) {
        res.status(401).send(err);

      });
  }
}

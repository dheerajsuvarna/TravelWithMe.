var User = require('../../models/UserModel');
var Chat = require('../../models/Chat');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');


module.exports = {


  getAll: function (req, res) {
  var room=req.params.room;
  room =  room.slice(1,room.lenght);
    Chat.find({room: room}, function (err, chats) {
      if (err) return next(err);

      res.json(chats);
    });
  },

  addMessage: function (req, res, next) {
    console.log("in add message");
    Chat.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });

  }
}

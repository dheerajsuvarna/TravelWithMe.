var User = require('../../models/UserModel');
var Chat = require('../../models/Chat');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');


module.exports = {


  getAll: function (req, res) {
    console.log("in get all ");

    Chat.find({room: req.params.room}, function (err, chats) {
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

/**
 * Created by nilu on 15/06/17.
 */
var Promise = require("bluebird");
var User = require('../../models/UserModel');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


module.exports = {
  authenticate: function (req, res) {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }

    User.findOne({
      username: req.body.username
    })
      .then(function (user) {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (!err && isMatch) {
            var token = jwt.sign(user, configPassport.secret);
            res.json({
              user: user,
              token: token
            });
          }
          else {

            res.status(401).send('Authentication failed.');
          }
        })
      })
      .catch(function (err) {
        res.status(401).send('Authentication failed.');

      });
  },

  create: function (req, res) {




    var options = {
      auth: {
        api_user: 'nilofer31',
        api_key: 'Test@123'
      }
    }
    var client = nodemailer.createTransport(sgTransport(options));





    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }
    //This not required as it is being checked at the client side
    /*var patt = new RegExp("([A-Za-z0-9._-]*@tum.de|[A-Za-z0-9._-]*@mytum.de)$");
    var matched = patt.test(req.body.username.trim());
    if(!matched)
    {
      console.log(req.body.username);
      return res.status(400).send("Invalid Email Domain");
    }*/
    console.log(req.body)
    var newUser = new User({
      Name: req.body.Name,
      username: req.body.username,
      password: req.body.password,
      email_address: req.body.email_address,
      DOB: req.body.DOB,
      tempToken: token = jwt.sign(req.body.username, configPassport.secret)
    });

    newUser.save()
      .then(function (user) {
        var email = {
          from: 'no-replay',
          to: req.body.email_address,
          subject: 'TravelWithMe activation link',
          text: 'Hello world',
          html: 'Please click below link for activartion..<br> <a href="http://localhost/4200/activation" + newUser.tempToken> http://localhost/4200/activation</a>'
        };
        client.sendMail(email, function(err, info){
          if (err ){
            console.log(error);
          }
          else {
            console.log('Message sent: ' + info.response);
          }
        });
        res.json("User created, please check your email for activation");
      })
      .catch(function (err) {
        res.status(400).send("not able to save" + err);
      });
  },

  getall: function (req, res) {
    User.find()
      .then(function (users) {
        // return users (without hashed passwords)
        users = _.map(users, function (user) {
          return _.omit(user, 'password');
        });
        return res.json(users);
      })
      .catch(function (err) {
        res.status(400).send(err);
      });

  },
}



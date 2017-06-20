/**
 * Created by nilu on 15/06/17.
 */
var Promise = require("bluebird");
var User = require('../../models/UserModel');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');



module.exports = {
  authenticate: function (req, res) {
    console.log("request body ", req.body.email_address);
    if (!req.body || !req.body.email_address || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }

    User.findOne({
      email_address: req.body.email_address
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

    if (!req.body || !req.body.email_address || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }

    var today = new Date();
    var birthDate = new Date(req.body.DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log("User age "+ age);
    //This is not required in server side
    /*var patt = new RegExp("([A-Za-z0-9._-]*@tum.de|[A-Za-z0-9._-]*@mytum.de)$");
    var matched = patt.test(req.body.username.trim());
    if(!matched)
    {
      console.log(req.body.username);
      return res.status(400).send("Invalid Email Domain");
    }*/
    console.log(req.body.DOB)
    var newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email_address: req.body.email_address,
      DOB: req.body.DOB,
      Age: age
    });
    console.log(newUser);
    newUser.save()
      .then(function (user) {
        console.log("saved successfully");
        res.json(user);
      })
      .catch(function (err) {
        console.log("could not save to database", err);
        res.status(400).send("not able to save" + err);
      });
  },

  getall: function (req, res) {
    User.findOne({email_address: req.body.email_address})
      .then(function (users) {
        // return users (without hashed passwords)
        users = _.map(users, function (user) {
          //user.DOB.toString();
          return _.omit(user, 'password');
        });
        return res.json(users);
      })
      .catch(function (err) {
        res.status(400).send(err);
      });

  },

  getprofile: function(req, res){
    User.findOne({email_address: req.body.email_address})
      .then(function (user){
        return users;
      })
  }
}



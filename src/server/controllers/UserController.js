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
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }

    User.findOne({
      email: req.body.email
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
    console.log(req.body, req.headers);
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }
    var patt = new RegExp("([A-Za-z0-9._-]*@tum.de|[A-Za-z0-9._-]*@mytum.de)$");
    var matched = patt.test(req.body.email.trim());
    if(!matched)
    {
      console.log(req.body.email);
      return res.status(400).send("Invalid Email Domain");
    }

    User.findOne({email: req.body.email},function(err, existingUser){
      if(existingUser  )
      return res.status(400).send("User Already Exists"); });


    var newUser = new User({

      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      description:req.body.description
    });

    newUser.save()
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.log(err);
        res.status(400).send(err);
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
  editprofile: function (req, res) {
    User.findOne({username: req.body.username},function(err, p){
      if(!p)
        return next(new Error('User does not exist'));
      else{
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username: req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var age = req.body.age;
        var gender =   req.body.gender;
        var nationality = req.body.nationality;

        User.update({ firstname: firstname, lastname: lastname, username: username, email: email, age: age, gender: gender, nationality: nationality}, function (err, username) {
          res.send(username)
        });

        p.save(function(err) {
          if (err)
            console.log('error')
          else
            console.log('success')
        });
      }
    });
}



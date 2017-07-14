/**
 * Created by nilu on 15/06/17.
 */
var User = require('../../models/UserModel');
var TempUser = require('../../models/TempUserModel');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');


// Password reset

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://travelwithme.seba@gmail.com:travelwithme46@smtp.gmail.com');




// verification
const  expirationInMinutes = 30;
mongoose = require('mongoose'),
  nev = require('email-verification')(mongoose);

nev.configure({
  verificationURL: 'http://localhost:4200/email-verification/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'tempusers',
  emailFieldName: 'email',
  passwordFieldName: 'password',
  URLFieldName: 'GENERATED_VERIFYING_URL',
  expirationTime: 86400,

  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'travelwithme.seba@gmail.com',
      pass: 'travelwithme46'
    }
  },
  verifyMailOptions: {
    from: 'Do Not Reply <twm@gmail.com>',
    subject: 'Please confirm your account',
    html: 'Click the following link to confirm your account:(Valid for the next 30 minutes) <p>${URL}</p>',
    text: 'Please confirm your account by clicking the following link: ${URL}'
  }
}, function(error, options){
  if(error)
   console.log(error.message);
});
nev.configure({
  tempUserModel: TempUser
}, function(error, options){
});


module.exports = {


  resetPassword: function (req, res) {
    req.body.email = req.body.email.toLowerCase();
    User.findOne({
      email: req.body.email
    }).then(function (user) {
    if(user)
    {
      var tok = token();
      user.passwordReset = tok;
      User.findOneAndUpdate({'email':user.email},user, {upsert:true}, function(err, doc){
      var mailOptions = {
        // from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
        to:user.email  , // list of receivers
        subject: 'Reset Password', // Subject line
        text: 'Please follow this link to reset your password \n\n'+'http://localhost:4200/reset-password-change/' +tok,
        // html: '<b>  </b>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info){
        res.json({
        });
        return res.status(200).send();
      });
      });
    }
    else
    {
      var err = new Error('Not Found');
      return res.status(401).send(err);
    }
    })
  },

  resetPasswordChange: function (req, res) {
    User.findOne({
      passwordReset: req.body.firstname
    }).then(function (user) {
      if(user)
      {
        var query = {'email':user.email};

        user.passwordReset = "";
        bcrypt.hash(req.body.password, 10, function (err, hash) {

          user.password =hash;
          User.findOneAndUpdate(query,user, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });

          });
        });

        var mailOptions = {
          // from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
          to:user.email  , // list of receivers
          subject: 'Reset Password', // Subject line
          text: 'Your password was changed successfully!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });
        res.json({
        });
        return res.status(200).send('Password changed Successfully');
      }
      else
      {
        return res.status(401).send("Email doesn't exist!");
      }
    })
  },

  authenticate: function (req, res) {
    if (!req.body || !req.body.email || !req.body.password) {
      console.log(req.body)
      return res.status(400).send('Incorrect request');
    }

    User.findOne({
      email: req.body.email.toLowerCase()
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
        res.status(401).send('User does not exist.');

      });
  },

  create: function (req, res) {
    console.log(req.body, req.headers);
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }
    var patt = new RegExp("([A-Za-z0-9._-]*@tum.de|[A-Za-z0-9._-]*@mytum.de)$");
    var matched = patt.test(req.body.email.trim());
    if (!matched) {
      console.log(req.body.email);
      return res.status(400).send("Invalid Email Domain");
    }

    User.findOne({email: req.body.email}, function (err, existingUser) {
      if (existingUser)
        return res.status(400).send("User Already Exists");
    });


    var newUser = new User({

      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      description: req.body.description
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
  getProfile: function (req, res) {
    console.log("helloo from the other side ----- getprofile", req.body);
    if (!req.body.email) {
      return res.status(400).send('Incorrect request');
    }

      User.findOne({email: req.body.email})
        .then( function (foundUser) {

          var retUser = _.omit(foundUser, 'password');
          console.log('why this kolavari di: ',retUser);
          return res.json(retUser);
        })
        .catch(function (err) {
          res.status(400).send(err);
        });
  },

  onUpdateProfile: function (req, res) {
    console.log("helloo from the other side  -- UpdateProfile");
    if (!req.body) {
      return res.status(400).send('Incorrect request');
    }
     User.findOne({email: req.body.email})
      .then( function(foundUser) {
        console.log(req.body);
        if (req.body.firstname)
          foundUser.firstname = req.body.firstname;
        if (req.body.lastname)
          foundUser.lastname = req.body.lastname;
        if (req.body.description)
          foundUser.description = req.body.description;
        if (req.body.nationality)
          foundUser.nationality = req.body.nationality;
        if (req.body.gender)
          foundUser.gender = req.body.gender;

        return User.update({email: req.body.email}, foundUser);
        })
        .then(function (updatedUser) {
          console.log(updatedUser);
          console.log("successfully updated");
          return res.json("Successfully updated !!");
         })
         .catch(function(err) {
            return res.status(401).send(err);
         })

  },

  createTemp: function (req, res) {

    console.log(req.body, req.headers);
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).send('Incorrect request');
    }
    var patt = new RegExp("([A-Za-z0-9._-]*@[Tt][Uu][Mm].[Dd][Ee]|[A-Za-z0-9._-]*@[Mm][Yy][Tt][Uu][Mm].[Dd][Ee])$");
    var matched = patt.test(req.body.email.trim());
    if (!matched) {
      console.log(req.body.email);
      return res.status(400).send("Invalid Email Domain");
    }

    req.body.email = req.body.email.toLowerCase();
    User.findOne({email: req.body.email}, function (err, existingUser) {
      console.log("Existing USer");
      if (existingUser)
        return res.status(400).send("User Already Exists");
    })

    TempUser.findOne({email: req.body.email}, function (err, existingUser) {
      console.log("Existing USer")
      if (existingUser)
        return res.status(400).send("User Already Exists");
    });

    var expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + expirationInMinutes);

    var newUser = new TempUser({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      gender: req.body.gender,
      expirationTime: expiration
    });


    nev.createTempUser(newUser, function (err, existingPersistentUser, newTempUser) {
// some sort of error
      if (err) // handle error...
      {
        console.log(err.message);
      }

// user already exists in persistent collection...
//       if (existingPersistentUser) // handle user's existence... violently.
//       {
//
//       }
// a new user
      if (newTempUser) {
        console.log(newTempUser);
        res.json(newTempUser);


        var URL = newTempUser[nev.options.URLFieldName];
        nev.sendVerificationEmail(newUser.email, URL, function (err, info) {
          if (err) {
            console.log(err.message);
          }
        });
      }
    });
  },

  confirmTempUser: function (req, res) {

    TempUser.findOneAndRemove({GENERATED_VERIFYING_URL: req.body.firstname}, function (err, existingUser) {
      if (existingUser) {

        if (existingUser.expirationTime < Date.now()) {
          return res.status(401).send("Expired please register again!");
        }

        var newUser = new User({
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          email: existingUser.email,
          password: existingUser.password,
          birthdate: existingUser.birthdate,
          gender: existingUser.gender
        });

        newUser.save()
          .then(function (user) {
            res.json(user);
            res.status(200).send("Confirmed!");
            nev.sendConfirmationEmail(newUser.email);
          })
          .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
          });
      }
    });

  },
  uploadProfileImage: function (req, res) {
    console.log("Reached", req.body);
    User.findOne({
      email: req.body.email
    })
      .then(function (foundUser) {
        foundUser.image = req.body.image;
        return User.update({
          email: req.body.email
        }, foundUser);
      })
      .then(function (updatedUser) {
        console.log("successfully updated", updatedUser);
        return res.json("Successfully updated !!");
      })
      .catch(function (err) {
        return res.status(400).send(err);
      });
  }


};
var rand = function() {
  return Math.random().toString(36).substr(2);
};

var token = function() {
  return rand() + rand();
};

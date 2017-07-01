/**
 * Created by nilu on 15/06/17.
 */
var User = require('../../models/UserModel');
var TempUser = require('../../models/TempUserModel');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');



// verification
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
    html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
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
  editprofile: function (req, res) {
    User.findOne({email: req.body.email}, function (err, p) {
      if (!p)
        return next(new Error('User does not exist'));
      else {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var gender = req.body.gender;
        var nationality = req.body.nationality;
        var description = req.body.description;

        User.update({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          gender: gender,
          description: description,
          nationality: nationality
        }, function (err, res) {
          return res.status(200).send('Successfully Updated');
        });

        p.save(function (err) {
          if (err)
            console.log('error')
          else
            console.log('success')
        });
      }
    });
  },

  createTemp: function(req,res){
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
    })

    TempUser.findOne({email: req.body.email}, function (err, existingUser) {
      if (existingUser)
        return res.status(400).send("User Already Exists");
    });


    var newUser = new TempUser({

      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
      gender: req.body.gender,
    });



    nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
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


          var URL = newTempUser[nev.options.URLFieldName]|| "WERWEQRASDFASDFASDF";
          nev.sendVerificationEmail(newUser.email, URL, function (err, info) {
            if (err) {
              console.log(err.message);
            }
            // newUser.save()
            //   .then(function (user) {
            //     res.json(user);
            //   })
            //   .catch(function (err) {
            //     console.log(err);
            //     res.status(400).send(err);
            //   });
          });
        }
    });
  },

  // createTemp: function (req,res) {
  //   console.log("sdf");
  //
  //   var newUser = new TempUser({
  //
  //           firstname: req.body.firstname,
  //           lastname: req.body.lastname,
  //           email: req.body.email,
  //           password: req.body.password,
  //           birthdate: req.body.birthdate,
  //           description: req.body.description
  //         });
  //
  //         var URL = newUser[nev.options.URLFieldName];
  //         nev.sendVerificationEmail(email, URL, function(err, info){
  //         if (err)
  //         {
  //           // handle error...
  //         }
  //         newUser.save()
  //           .then(function (user) {
  //             res.json(user);
  //           })
  //           .catch(function (err) {
  //             console.log(err);
  //             res.status(400).send(err);
  //           });
  //         });
  //
  // },

  confirmTempUser: function (req,res) {


    nev.sendVerificationEmail("bakri_bitar@hotmail.com", URL, function (err, info) {
      if (err) {
        console.log(err.message);
      }
      // newUser.save()
      //   .then(function (user) {
      //     res.json(user);
      //   })
      //   .catch(function (err) {
      //     console.log(err);
      //     res.status(400).send(err);
      //   });
    });

    nev.confirmTempUser(req.URL, function(err, user) {



      if (err)
      {}
      // handle error...

      // user was found!
        if (user) {
          // optional
          nev.sendConfirmationEmail(user['email_field_name'], function(err, info) {
            // redirect to their profile...
          });
        }

        // user's data probably expired...
        else
        {}
        // redirect to sign-up
          });


  },
}

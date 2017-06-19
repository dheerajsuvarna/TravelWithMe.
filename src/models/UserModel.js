/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const saltRounds = 10

var UserSchema = new Schema({
  Name: {
    type: String,
    unique: false,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    unique: true,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true

  },
  nationality: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});
UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}



module.exports = mongoose.model('User', UserSchema);

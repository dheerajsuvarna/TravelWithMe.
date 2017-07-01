/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const saltRounds = 10

var UserSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  age: {
    type: Number,
    required: false
  },
  birthdate:{
    type: String,
    required: false

  },
  gender: {
    type: String,
    required: false

  },
  nationality: {
    type: String,
    required: false

  },
  firstname: {
    type: String,
    required: false

    // required: true
  },
  lastname: {
    type: String,
    required: false

    // required: true
  },
  description: {
    type: String,
    required: false

    // required: true
  },
  // img: { data: Buffer, contentType: String }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return next(err);
      }
     // user.password = hash;
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

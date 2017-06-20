/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const saltRounds = 10

var UserSchema = new Schema({
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
  },
<<<<<<< HEAD
  DOB: {
    type: Date,
    required: false,
    default: new Date()
  },
  active:{
    type: Boolean,
    required: true,
    default: false
  },
  tempToken:{
    type: String,
    required: true
=======
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  firstname: {
    type: String,
    // required: true
  },
  lastname: {
    type: String,
    // required: true
>>>>>>> 2535295141fd1d68dc9adfb507f61601235f4d40
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

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const saltRounds = 10

var TempUserSchema = new Schema({
  GENERATED_VERIFYING_URL: {
    type: String,
    unique:true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
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
  },
  lastname: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  expirationTime : {
    type: Date,
    required: false
  },
});

TempUserSchema.pre('save', function (next) {
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
TempUserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}



module.exports = mongoose.model('TempUser', TempUserSchema);

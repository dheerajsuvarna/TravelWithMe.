/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TripSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  tripName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  budget:{
    type: Number,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema'
  },
  interests:{
   type: [String],
    required: false
  },
  startDate: {
    type: String,
    required: false
  },
  endDate: {
    type: String,
    required: false
  },
  numOfPeople: {
    type: Number,
    required: true
  },
  joinUser: [{
    type: String,
    default: 0
  }]
});

module.exports = mongoose.model('TripPlan', TripSchema);


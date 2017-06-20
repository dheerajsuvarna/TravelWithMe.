/**
 * Created by nilu on 15/06/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TripPlan = new Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  TripName: {
    type: String,
    unique: true
  },
  BudgetLow:{
    type: Number,
    required: false
  },
  BudgetMax:{
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Trip', TripPlan);


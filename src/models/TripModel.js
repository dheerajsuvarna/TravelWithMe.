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
    requiired: true
  },
  TripID: {
    type: Number,
  },
  Budget:{
    type: Number,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('TripPlan', TripSchema);


/**
 * Created by nilu on 15/06/17.
 */
/**
 * Created by nilu on 15/06/17.
 */
var Promise = require("bluebird");
var Trip = require('../../models/TripModel');
var User = require('../../models/UserModel');
var configDb = require('../config/database');
var configPassport = require('../config/passport');
var jwt = require('jsonwebtoken');
var _ = require('lodash');


module.exports = {
 addtrip: function (req, res) {
   var newTrip = new Trip({
     source: req.body.source,
     destination: req.body.destination,
     budget: req.body.budget,
     tripName: req.body.tripName,
     description: req.body.description,
     startDate: req.body.startDate,
     endDate: req.body.endDate,
     numOfPeople: req.body.numOfPeople,
     user: req.body.user,
     interests:req.body.interests

   });

   newTrip.save()
     .then(function (trip) {
       console.log('success: trip added', newTrip)
       return res.json(newTrip)
     })
     .catch(function (err) {
       console.log(err)
       return res.status(400).send(err);
     });
 },
  mytrip: function (req,res) {
    Trip.find()
      .then(function (trips) {
        return res.json(trips);
      })
      .catch(function (err) {
        res.status(401).send(err);

      });
  },

    mytrips: function (req,res) {
      Trip.find({'user': req.user._doc._id})
        .then(function (trips){
          return res.json(trips);
        })
        .catch(function (err) {
          res.status(401).send(err);

        });
  }

}

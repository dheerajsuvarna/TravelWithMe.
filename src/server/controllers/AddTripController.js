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
 create: function (req, res) {
   var newTrip = new Trip({
     source: req.body.source,
     destination: req.body.destination,
     Budget: req.body.Budget
   });

   newTrip.save()
     .then(function (trip) {
       res.json(trip)

         .catch(function (err) {
           res.status(400).send(err);
         });
     })
 },
  mytrip: function (req,res) {
    Trip.find()
      .then(function (trips){
        return res.json(trips);
      })
      .catch(function (err) {
        res.status(401).send(err);

      });
  }

}

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
  searchtrips: function (req,res) {
    var date = new Date();
    var today = date.getFullYear() + '-07-'+date.getDate();
    Trip.find()
      .where('user').ne(req.user._doc._id)
      .where('joinUser').ne(req.user._doc.email)
      .where('startDate').gt(today)
      .then(function (trips) {
        return res.json(trips);
      })
      .catch(function (err) {
        res.status(401).send(err);
      });
  },

    mytrips: function (req,res) {
      Trip.find({'user': req.user._doc._id})
      // Trip.find()
        .then(function (trips){
          return res.json(trips);
        })
        .catch(function (err) {
          res.status(401).send(err);

        });
  },

  joinTrip: function (req, res) {
   console.log('I am in joinTrip service+++++++');
   console.log('in Service  ', req.body);
   if(!req.body)
     return res.status(400).send('Invalid Request');
   Trip.findOne({tripName: req.body.tripName})
     .then(function (foundTrip) {
       console.log('found trip:', foundTrip);
       if(req.body.joinUser) {
         foundTrip.joinUser = req.body.joinUser;
         console.log('locally update:  ',foundTrip);
         return Trip.update({tripName: req.body.tripName}, foundTrip);

       }
     })
     .then(function (updatedTrip) {
       console.log('successfully updated', updatedTrip);
       return res.json('Successful');

     })
     .catch(function (err) {
       console.log('failed to update');
       return res.status(404).send(err);

     });

    return res;
  }

};

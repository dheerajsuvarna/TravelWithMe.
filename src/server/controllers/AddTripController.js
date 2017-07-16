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
       console.log('success: trip added', newTrip);
       return res.json(newTrip)
     })
     .catch(function (err) {
       console.log(err);
       return res.status(400).send(err);
     });
 },


  searchtrips: function (req,res) {
    Trip.find().populate('user')
      .where('user').ne(req.user._doc._id)
      .where('joinUser').ne(req.user._doc._id)
      .then(function (trips) {
        return res.json(trips);
      })
      .catch(function (err) {
        res.status(401).send(err);
      });
  },

    mytrips: function (req,res) {

      Trip.find({'user': req.user._doc._id}).populate('user').populate('joinUser')

      // Trip.find({'user': req.user._doc._id})

        .then(function (trips){
          return res.json(trips);
        })
        .catch(function (err) {
          res.status(500).send(err);

        });
  },

  tripsImAttending: function (req,res) {
    Trip.find({'joinUser':  req.user._doc._id}).populate('user').populate('joinUser')

      .then(function (trips){

        return res.json(trips);
      })
      .catch(function (err) {
        res.status(500).send(err);

      });
  },


  joinTrip: function (req, res) {
   console.log('I am in joinTrip service+++++++');
   console.log('in Service  ', req.body);
   if(!req.body)
     return res.status(400).send('Invalid Request');
   Trip.findOne({'_id':req.body.trip._id})
     .then(function (foundTrip) {
       console.log('found trip:', foundTrip);
         foundTrip.joinUser.push(req.body.user);
         console.log('locally update:  ',foundTrip);
         return foundTrip.save();

     })
     .then(function (updatedTrip) {
       console.log('successfully updated==>', updatedTrip);
       return res.json('Successful');

     })
     .catch(function (err) {
       console.log(err);
       return res.status(404).send(err);

     });

    return res;
  },

  leaveTrip: function (req, res) {
    console.log('I am in leave service+++++++');
    console.log('in Service  ', req.body);
    if(!req.body)
      return res.status(400).send('Invalid Request');
    Trip.update({'_id': req.body.trip}, {$pull:{'joinUser': req.user._doc._id}})
      .then(function (updatedTrip) {
        console.log('successfully updated==>', updatedTrip);
        return res.json('Successful');

      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);

      });

    return res;
  }


};

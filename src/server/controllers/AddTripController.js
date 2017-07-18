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
   date = new Date();
   today= date.getFullYear() + "-07-" + date.getDate();
    Trip.find()
      .where('user').ne(req.user._doc._id)

      .where('joinUser').ne(req.user._doc._id)

      .where('startDate').gte(this.today)
      .populate('user')

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

  getParticipants: function (req,res) {

console.log(req);

  },


  deletetrip: function (req,res) {
    console.log('we are in the controller')
    Trip.findByIdAndRemove(req.body._id, function(err) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'Offer Deleted!'});
      console.log('deleted')
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


  gettrip: function (req,res) {
    Trip.find({'_id': req.body.firstname})
      .then(function (trip){
        return res.json(trip);
      })
      .catch(function (err) {
        res.status(401).send(err);

      });
  },

  updateTrip: function (req, res) {
    console.log("helloo from the other side  -- UpdateTrip");
    if (!req.body) {
      return res.status(400).send('Incorrect request');
    }
    Trip.find({'_id': req.body._id})
      .then( function(foundTrip) {
        if (req.body.tripName)
          foundTrip.tripName = req.body.tripName;
        console.log(foundTrip.tripName)
        if (req.body.source)
          foundTrip.source = req.body.source;
        if (req.body.destination)
          foundTrip.destination = req.body.destination;
        if (req.body.description)
          foundTrip.description = req.body.description;
        if (req.body.budget)
          foundTrip.budget = req.body.budget;
        if (req.body.user)
          foundTrip.user = req.body.user;
        if (req.body.startDate)
          foundTrip.startDate = req.body.startDate;
        if (req.body.endDate)
          foundTrip.endDate = req.body.endDate;
        if (req.body.numOfPeople)
          foundTrip.numOfPeople = req.body.numOfPeople;
        if (req.body.interests)
          foundTrip.interests = req.body.interests;

        Trip.update( { _id: req.body._id },
          {
            $set: {
              tripName: foundTrip.tripName,
              source: foundTrip.source,
              destination: foundTrip.destination,
              description: foundTrip.description,
              budget: foundTrip.budget,
              startDate: foundTrip.startDate,
              endDate: foundTrip.endDate,
              numOfPeople: foundTrip.numOfPeople,
              interests: foundTrip.interests,

              //this are set of names ex; ['name1', 'name2']
            },
          },
          function(err, results) {
            if(err) res.status(500).send(err);
            console.log(results);


          }
        );
        console.log(foundTrip.tripName)
      })
      .then(function (updatedTrip) {
        console.log(updatedTrip);
        console.log("successfully updated");
        return res.json("Successfully updated !!");
      })
      .catch(function(err) {
        return res.status(401).send(err);
      })

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
        return res.json('successful');

      })
      .catch(function (err) {
        console.log(err);
        return res.status(404).send(err);

      });

    return res;
  }


};

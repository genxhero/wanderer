const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Event = require('../../models/Event');
const validateEventInput = require('../../validations/events');

// Again - events are not actually used in Wayfarer - however, we will probably want routes for "Find all Cars by User", "Find a user's Car", and "Post new Car"

// Get All Events
router.get('/', (req, res) => {
  Event.find()
    .sort({date: -1})
    .then(events => res.json(events))
    .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
});

//Get a single event
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(404).json({noeventsfound: 'No events found'}));
});

//Post an event if you are an authorized user
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newEvent = new Event({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  })

  newEvent.save().then(event => res.json(event));
  }
);

module.exports = router;

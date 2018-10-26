const isMake = require("../../validations/is-make");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const validateVehicle = require('../../validations/vehicles');
const User = require('../../models/User');
const Vehicle = require("../../models/Vehicle").Vehicle;
// const Vehicle = require("mongoose").model('vehicle');

router.post(
  "/addoffline",
  (req, res) => {
    const { errors, isValid } = validateVehicle(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newVehicle = new Vehicle({
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        hwyMpg: req.body.hwyMpg,
        cityMpg: req.body.cityMpg,
        tankSize: req.body.tankSize
      });
      newVehicle.maxRouteLength =
        ((newVehicle.hwyMpg + newVehicle.cityMpg) / 2) * newVehicle.tankSize;

      if(req.user){
           newVehicle.owner = req.user.id
      }
        newVehicle.save().then(vehicle => res.json(vehicle));
    }
  }
);

// Cleaned up some of the debugging here since the route works - appreciate the good practice of not deleting code though!

router.post(
  "/addonline",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateVehicle(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newVehicle = new Vehicle({
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        hwyMpg: req.body.hwyMpg,
        cityMpg: req.body.cityMpg,
        tankSize: req.body.tankSize
      });
      newVehicle.maxRouteLength =
        ((newVehicle.hwyMpg + newVehicle.cityMpg) / 2) * newVehicle.tankSize;

      if (req.user) {
        newVehicle.owner = req.user.id;
        let owner = await User.findOne({
          _id: req.user._id
        });
        owner.vehicles.push(newVehicle);
        owner = await owner.save();
        newVehicle
          .save()
          .then(vehicle => res.json(vehicle));
      }
    }
  }
);

//get one vehicle, may need to nest under a user?
//Team assemble!
router.get('/:id', (req, res) => {
    Vehicle.findById(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(404).json(err));
    //err is just res like in the old thunktions
});


module.exports = router;
const isMake = require("../../validations/is-make");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const validateVehicle = require('../../validations/vehicles');
const Vehicle = require("../../models/Vehicle");


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

router.post(
  "/addonline",
  passport.authenticate("jwt", { session: false }),
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

      if (req.user) {
        newVehicle.owner = req.user.id;
        console.log(newVehicle.owner);
        req.user.vehicles.push(newVehicle);
        User.findOneAndUpdate(req.user.id, req.user);

        console.log(req.user.vehicles);

      }
        
       

      newVehicle.save().then(vehicle => res.json(vehicle));
    }
  }
);

//get one vehicle, may need to nest under a user?
//Team assemble!
router.get('/:id', (req, res) => {
    Vehicle.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(404).json({carnotfound: "No such vehicle"}));
    //err is just res like in the old thunktions
});


module.exports = router;
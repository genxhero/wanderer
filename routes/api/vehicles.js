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

                      // console.log(newVehicle.owner);

                      //  let idx = req.user.vehicles.length;
                      //  req.user.vehicles[idx] = newVehicle;
                      // console.log(`req.user is: ${req.user}`);
                      //User.findOneAndUpdate({username: req.username}, req.user, {new: true});

                      let owner = await User.findOne({
                        _id: req.user._id
                      });
                      console.log(owner);
                      owner.vehicles.push(newVehicle);
                      console.log(owner.vehicles);

                      owner = await owner.save();

                      //  owner = await owner.save();
                      // owner = await owner.populate('vehicles');

                      console.log(owner.vehicles.length);

                      //   console.log(req.user.vehicles);
                      //   console.log(`username: ${req.user.username}`)
                      //   User.findOne({ _id: req.user._id })
                      // //   .populate("vehicles")
                      //   .exec( (err, user) => {
                      //       debugger;
                      //       console.log(err);
                      //       user.vehicles.push(newVehicle)

                      //   });

                      // console.log(`new user: ${newUser}`);
                    return newVehicle
                        .save()
                        .then(vehicle => res.json(vehicle));
                    }

                    // else {
                    //   const dummyUser = new User({
                    //     username: "dummyuser",
                    //     email: "daremoinan@nowhere.com",
                    //     password: "thereisnospoon"
                    //   });
                    //   newVehicle.owner=dummyUser;
                    // }

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
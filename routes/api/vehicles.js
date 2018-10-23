const isMake = require("../../validations/is-make");
const express = require("express");
const router = express.Router();
const validateVehicle = require('../../validations/vehicles');
const Vehicle = require("../../models/Vehicle");


router.post('/addvehicle'), (req, res) => {

    const {errors, isValid} = validateVehicle(req.body)

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

        newVehicle.maxRouteLength = ((newVehicle.hwyMpg + newVehicle.cityMpg)/2) * tankSize;

    }
}

module.exports = router;
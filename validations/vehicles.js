const Validator = require('validator');
const isMake = require("./is-make");
const isEmpty = require('./is-empty');
//const isModel = require('./ls-model');

//These are the validations for the vehicle modelmodule.exports = function validateEventInput(data) {

module.exports = function validateVehicle(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.make = !isEmpty(data.make) ? data.make : "";
  data.model = !isEmpty(data.model) ? data.model : "";

  data.year = !isEmpty(data.year) ? data.year : "";
    data.tankSize = !isEmpty(data.tankSize) ? data.tankSize : "";
    data.hwyMpg = !isEmpty(data.hwyMpg) ? data.hwyMpg : "";
    data.cityMpg = !isEmpty(data.cityMpg) ? data.cityMpg : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name can not be blank";
  }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name can not be blank";
    }
    
    if (Validator.isEmpty(data.make)) {
        errors.make = "Vehicle make can not be blank";
    }

    if (!isMake(data.make)){
        errors.make = "No such vehicle make exists."
    }
    
    if (Validator.isEmpty(data.model)) {
        errors.model = "Vehicle model can not be blank";
    }

    // if (!Validator.isModel(data.model) && Validator.isMake(data.make)) {
    //     errors.model = `${data.make} doesn't produce a model called ${data.model}`;
    // }

    if (Validator.isEmpty(data.year)) {
      errors.year = "Vehicle year can not be blank";
    }

    if (data.model === "Rocket 69" || data.make === "Corvega"){
      errors.model = "Hey, this ain't Fallout. Try again.";
    }

    if (Validator.isEmpty(data.hwyMpg)) {
      errors.hwyMpg = "Highway MPG can not be blank";
    }

    if (Validator.isEmpty(data.cityMpg)) {
      errors.cityMpg = "City MPG can not be blank";
    }

    if (Validator.isEmpty(data.tankSize)) {
      errors.tankSize = "Tank Size can not be blank";
    }



  return { errors, isValid: isEmpty(errors) };
};
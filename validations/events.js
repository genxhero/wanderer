const Validator = require('validator');
const isEmpty = require('./is-empty');

//Note - this is going to be changing, likely into a Car validator, a Car model, and a Car route
// but it makes a great skeleton and review of the setup for the Mongoose/Express interaction

module.exports = function validateEventInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text), {min: 10, max: 300}) {
    errors.text = "Event name must be between 10 and 300 characters"
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "The text field is required"
  }

  return {errors, isValid: isEmpty(errors)};
};
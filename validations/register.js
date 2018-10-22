const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegistrationInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

// It turns out that when you want to know if something is empty, you don't want to ask the Validator whether something is not empty, therefore it's in error - essentially
// it's Validator.isEmpty, not !Validator.isEmpty - this threw me off given the pattern on isEmail, isLength, etc.

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  }

  if (!Validator.isLength(data.username, {min: 2, max: 30})) {
    errors.username = "Username must be between 2 and 30 characters"
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required"
  }

// Passwords of 8 chars minimum is better than 6 :|.  I'm unsure about having a max but I guess it prevents a vector of attack where a user can put in, like,
// trillions of characters to crash your db, or use the password characters to execute an attack...somehow

  if (!Validator.isLength(data.password, {min: 8, max:32})) {
    errors.password = "Password must be greater than 8 characters"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required"
  }

// Password2 is essentially the "Confirm your password" field

  if (!Validator.isLength(data.password2, { min: 8, max: 32 })) {
    errors.password2 = "Password must be greater than 8 characters"
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password field is required"
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Password must match"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
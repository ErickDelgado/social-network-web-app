const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Ensuring we are testing a string
  // Validator can only be used in conjunction with strings
  data.text = !isEmpty(data.email) ? data.email : '';

  if(Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email field is invalid';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  // Ensuring we are testing a string
  // Validator can only be used in conjunction with strings
  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, {min:1, max:300})) {
    errors.text = 'Post must be between 1 and 300 characters';
  }

  if(Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

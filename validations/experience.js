const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Ensuring we are testing a string
  // Validator can only be used in conjunction with strings
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if(Validator.isEmpty(data.title)) {
    errors.password = 'Title field is required';
  }

  if(Validator.isEmpty(data.title)) {
    errors.password = 'Title field is required';
  }

  if(Validator.isEmpty(data.company)) {
    errors.password = 'Company field is required';
  }

  if(Validator.isEmpty(data.from)) {
    errors.password = 'From field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

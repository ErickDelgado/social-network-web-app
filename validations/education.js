const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Ensuring we are testing a string
  // Validator can only be used in conjunction with strings
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if(Validator.isEmpty(data.school)) {
    errors.password = 'School field is required';
  }

  if(Validator.isEmpty(data.degree)) {
    errors.password = 'Degree field is required';
  }

  if(Validator.isEmpty(data.fieldofstudy)) {
    errors.password = 'Field of study field is required';
  }

  if(Validator.isEmpty(data.from)) {
    errors.password = 'From field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};

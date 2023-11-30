const { validationResult } = require('express-validator');

function ValidateAPIRequest(req) {

  const errors = validationResult(req);
  if (errors != "") {
    res.json(errors);
  }
  return "";
}

module.exports = {
  validateAPIRequest: ValidateAPIRequest
}
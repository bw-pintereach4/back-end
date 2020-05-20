//Authorization
const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    try {
      //verify token
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;

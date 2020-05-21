//Authorization
const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          message: "token not authorized",
        });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "not authorized",
          });
        }

        req.token = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;

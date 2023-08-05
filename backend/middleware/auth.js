
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const checkDuplicateEmail = (req, res, next) => {
  // Check for duplicate email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(200).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};



verifyToken = (requireToken) => (req, res, next) => {
  let token = req.body.token;
  console.log(req);

  if (requireToken && !token) {
    return res.status(403).send({ message: "No token provided!", isAuthenticated: false });
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next();
        }
        return res.status(401).send({ message: "Unauthorized!", isAuthenticated: false });
      }

      // Set the email property on req.user
      req.user = {
        email: decoded.email,
      };
      next();
    });
  } else {
    next();
  }
};


module.exports = {
  checkDuplicateEmail,
  verifyToken,
};

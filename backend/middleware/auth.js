
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const checkDuplicateEmail = (req, res, next) => {
  // Check for duplicate email
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};



verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    // Set the email property on req.user
    req.user = {
      email: decoded.email,
    };

    next();
  });
};


module.exports = {
  checkDuplicateEmail,
  verifyToken,
};

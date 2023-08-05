const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Post=db.post;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists. Please use a different email." });
    }

    // Create a new user instance
    const user = new User({
      username,
      email,
      password
    });

    // Save the user to the database
    const savedUser = await user.save();

    res.status(201).send({ message: "User registered successfully!", user: savedUser });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};


exports.signin = async (req, res) => {

  if (req.user) {
    return res.status(200).send({
      message: "You are already signed in.",
    });
  }
  
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Simple password comparison (not recommended for production)
    if (req.body.password !== user.password) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ email: user.email }, config.secret, {
      algorithm: 'HS256',
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getProfile = async (req, res) => {
  const userEmail = req.user.email; // Get the email from the decoded JWT token

  try {
    // Find the user information based on the email
    const user = await User.findOne({ email: userEmail }, { _id: 0, username: 1, email: 1 }).exec();

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Find all posts associated with the user's email
    const posts = await Post.find({ postGiverEmail: userEmail }).exec();

    // Send the user profile along with the posts as a response
    res.status(200).send({
      user: {
        username: user.username,
        email: user.email,
      },
      posts,
    });
  } catch (err) {
    res.status(500).send({ message: "Error while fetching user information." });
  }
};

exports.getAuth = async (req, res) => {
  try {
    res.status(200).send({
        message: req.user,
        isAuthenticated: 'true'
    });
  } catch (err) {
    res.status(500).send({ message: "Error while fetching user information.",
    isAuthenticated: 'false' });
  }
};

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");

// Signup route
router.post("/signup", authMiddleware.verifyToken(false),authMiddleware.checkDuplicateEmail, userController.signup);

// Signin route
router.post("/signin", authMiddleware.verifyToken(false),userController.signin);
router.post("/auth", authMiddleware.verifyToken(true),userController.getAuth);

// Profile route (requires authentication)
router.post("/profile", authMiddleware.verifyToken(true), userController.getProfile);

module.exports = router;

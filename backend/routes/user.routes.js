const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");

// Signup route
router.post("/signup", authMiddleware.checkDuplicateEmail, userController.signup);

// Signin route
router.post("/signin", userController.signin);
router.get("/auth", authMiddleware.verifyToken,userController.getAuth);

// Profile route (requires authentication)
router.get("/profile", authMiddleware.verifyToken, userController.getProfile);

module.exports = router;

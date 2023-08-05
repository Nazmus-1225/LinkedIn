const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/auth");

// Get all notifications route (requires authentication)
router.post("/notifications", authMiddleware.verifyToken(true), notificationController.getAllNotifications);

module.exports = router;

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/auth");

// Get all notifications route (requires authentication)
router.get("/notifications", authMiddleware.verifyToken, notificationController.getAllNotifications);

module.exports = router;
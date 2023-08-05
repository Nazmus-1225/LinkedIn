const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

// Set up Multer for handling file uploads (assuming you have it installed)
const upload = multer({ dest: 'uploads/' });

// Get all posts route (requires authentication)
router.post("/posts", authMiddleware.verifyToken(true), postController.getAllPosts);

// Create a new post route (requires authentication)
router.post("/post", authMiddleware.verifyToken(true), upload.single("image"), postController.createPost);

module.exports = router;

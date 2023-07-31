const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Post=db.post;
const User = require("../models/user.model.js");
const Minio = require("minio");


const minioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "N0AeZn3fRLqIFksxAeOi",
  secretKey: "nc8nnsJzQaYXjh6gv18f5GMEqJt0zzVJPUU39bQK",
});



exports.getAllPosts = async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Perform the left join using $lookup
    const postsWithUsername = await Post.aggregate([
      {
        $match: {
          postGiverEmail: { $ne: userEmail },
        },
      },
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "postGiverEmail",
          foreignField: "email",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Unwind the result array from $lookup to get the user object
      },
      {
        $project: {
          _id: 1,
          text: 1,
          hasImage: 1,
          imagePath: 1,
          datePosted: 1,
          username: "$user.username", // Get the username from the user object
          email: "$user.email", // Also include the email of the post giver if needed
        },
      },
    ]);

    res.status(200).send(postsWithUsername);
  } catch (err) {
    console.error("Error while fetching posts:", err);
    res.status(500).send({ message: "Error while fetching posts." });
  }
};


exports.createPost = async (req, res) => {
  try {
    // Verify the token using the 'verifyToken' middleware
    let token = req.headers["x-access-token"];
    await jwt.verify(token, config.secret);

    // Token is valid, proceed with post creation
    const { text, hasImage } = req.body;
    const postGiverEmail = req.user.email; // Use the email from req.user

    let imagePath = "";
    if (hasImage) {
      if (!req.file) {
        return res.status(400).send({ message: "No image provided!" });
      }

      const fileStream = req.file.buffer;
      const bucketName = "linkedin"; // Replace with your MinIO bucket name
      const objectKey = `${Date.now()}-${req.file.originalname}`;

      await minioClient.putObject(bucketName, objectKey, fileStream);

      imagePath = `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectKey}`;
    }

    const post = new Post({
      text,
      hasImage,
      imagePath,
      postGiverEmail,
    });

    const savedPost = await post.save();

    res.status(201).send(savedPost);
  } catch (err) {
    console.error("Error while creating the post:", err);
    res.status(500).send({ message: "Error while creating the post." });
  }
};

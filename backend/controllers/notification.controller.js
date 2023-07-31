const moment = require("moment");
const db = require("../models");
const Post=db.post;

exports.getAllNotifications = async (req, res) => {
  try {
    const userEmail = req.user.email;

    // Calculate the date 7 days ago from today
    const lastSevenDays = new Date();
    lastSevenDays.setDate(lastSevenDays.getDate() - 7);

    // Perform the left join using $lookup and filter by date
    const notificationsWithUsername = await Post.aggregate([
      {
        $match: {
          postGiverEmail: { $ne: userEmail },
          datePosted: { $gte: lastSevenDays },
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

    res.status(200).send(notificationsWithUsername);
  } catch (err) {
    console.error("Error while fetching notifications:", err);
    res.status(500).send({ message: "Error while fetching notifications." });
  }
};
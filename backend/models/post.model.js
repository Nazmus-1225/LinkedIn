const mongoose = require('mongoose');

const Post = mongoose.model(
"Post",
new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  hasImage: {
    type: Boolean,
    default: false,
  },
  imagePath: {
    type: String,
    default: '',
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  postGiverEmail: {
    type: String,
    required: true,
  },
})
);

module.exports = Post;

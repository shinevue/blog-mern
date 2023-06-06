const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  user_id: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  watch: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Blogs", blogSchema);

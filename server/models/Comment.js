const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  user: {
    name: String,
    email: String,
    profileImage: String,
  },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  text: {
    type: String,
    required: true,
  },
  like: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };

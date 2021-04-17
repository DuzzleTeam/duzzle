const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };

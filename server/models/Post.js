const { Schema } = require("mongoose");
const config = require("../config/key");

const postSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  content: {
    text: {
      type: String,
      required: true,
    },
    images: [String],
    files: [String],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isWezzle: {
    type: Boolean,
  },
  recruit: {
    period: {
      type: String,
    },
    field: {
      type: [Number],
    },
    peopleNum: {
      type: Number,
    },
  },
  projectPeriod: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };

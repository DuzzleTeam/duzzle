const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Comment } = require("./Comment");

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
  contents: {
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
      type: [String],
    },
    peopleNum: {
      type: Number,
    },
  },
  projectPeriod: {
    type: String,
  },
});

postSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const { _id } = this.getFilter();
    await Comment.deleteMany({ post: _id });
    next();
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };

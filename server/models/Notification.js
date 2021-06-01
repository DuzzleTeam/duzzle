const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  isChecked: {
    Boolean,
    default: false,
  },
  occurTime: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };

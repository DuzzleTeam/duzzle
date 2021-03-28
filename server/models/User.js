const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  field: {
    type: Array,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  group: String,
  introduction: {
    type: String,
    maxlength: 50,
  },
  profileImage: String,
  role: {
    type: Number,
    default: 0,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

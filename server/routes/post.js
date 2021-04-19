const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");
const { User } = require("../models/User");

// 게시물 작성 (dayeon-choi, 2021-04-19)
router.post("/:type(wezzle|mezzle)/post/new", (req, res) => {
  // 사용자가 작성한 게시글 데이터로 Post 생성
  const post = new Post(req.body);
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    post.user = user;
  });
});

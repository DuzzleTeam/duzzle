const { json } = require("body-parser");
const express = require("express");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Notification } = require("../models/Notification");

const router = express.Router();

// 05.31 / 댓글 작성시 댓글 정보 가져와서 DB 저장
router.get("/nofitication/:commentId", async (req, res) => {
  // url로 전달받은 comment id 가져오기
  const commentId = req.params.commentId;
  // comment id로 댓글 찾기
  const comment = await Comment.findOne({ _id: commentId });
  // 찾은 댓글이 달린 게시글 찾기
  const post = await Post.findOne({ _id: comment.post });

  // 찾은 정보로 body 구성
  const body = {
    user: post.user,
    provider: comment.user,
    post: post._id,
    isChecked: false,
  };

  // 내가 아닌 다른 사람들이 댓글을 달았을 때
  if (post.user.toString() != comment.user.toString()) {
    // DB 구성
    const notification = new Notification(body);
    // DB에 저장
    notification.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  }
});

// 알림 가져오기
router.get(`/api/notification/:userId`, (req, res) => {
  // url로 전달받은 user id 가져오기
  const userId = req.params.userId;
  // notification DB에서 user가 userId와 일치하는 값 가져오기
  Notification.findOne({ user: userId }, (err, user) => {
    if (err)
      return json({
        message: "사용자 정보 조회 오류",
      });
    return res.json({
      success: true,
    });
  });
});

module.exports = router;

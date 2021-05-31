const express = require("express");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");
const { Notification } = require("../models/Notification");

const router = express.Router();

// 05.31 / 댓글 작성시 댓글 정보 가져오기
router.get("/nofitication/:commentId", async (req, res) => {
  // url로 전달받은 comment id 가져오기
  const commentId = req.params.commentId;
  // comment id로 댓글 찾기
  const comment = await Comment.findOne({ _id: commentId });
  // url로 입력받은 정보로 body 구성
  const body = {
    user: comment.post.user,
    provider: comment.user,
    post: comment.post,
    isChecked: false,
  };
  // DB 구성
  const notification = new Notification(body);

  // DB에 저장
  notification.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;

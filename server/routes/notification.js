const express = require("express");
const { Post } = require("../models/Post");
const { User } = require("../models/User");
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
router.get(`/notification/:userId`, (req, res) => {
  // url로 전달받은 user id 가져오기
  const userId = req.params.userId;
  // urlId user가 받은 알림 가져오기
  Notification.find((err, notification) => {
    if (!notification) return console.log("알림 찾을 수 없음");
    for (i = 0; i < notification.length; i++) {
      // 알림의 user가 현재 접속하고 있는 user와 일치한다면(나한테 온 알림)
      if (notification[i].user.toString() == userId) {
        // 알림을 보낸 사람 찾기(provider)
        const provider = User.findOne(
          { _id: notification[i].provider.toString() },
          (err, provider) => {
            return provider;
          }
        );
        // 댓글이 달린 게시물 찾기(post)
        Post.findOne({ _id: notification[i].post.toString() }, (err, post) => {
          if (!post) return console.log("게시글 찾을 수 없음");
          // 댓글 내용 찾기(comment)
          Comment.find((err, comment) => {
            if (!comment) return console.log("댓글 찾을 수 없음");
            // 최근 달린 댓글부터
            for (i = comment.length - 1; i >= 0; i--) {
              if (comment[i].post.toString() == post._id) {
                return res.status(200).json({
                  provider: provider.name,
                  isWezzle: post.isWezzle,
                  content: comment[i].text,
                  occurTime: comment[i].createdAt,
                });
              }
            }
          });
        }).catch((e) => {
          console.error(e);
        });
      }
    }
  });
});

module.exports = router;

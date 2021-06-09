const express = require("express");
const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { Comment } = require("../models/Comment");
const { Like } = require("../models/Like");
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
    comment: comment._id,
    isChecked: false,
  };

  // 내가 아닌 다른 사람이 댓글을 달았을 때
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
  } else {
    return res.status(200).json({
      success: true,
    });
  }
});

// 좋아요 눌러졌을 알림 저장
router.get(`/notification/:postId/:userId`, async (req, res) => {
  // url로 전달받은 postId
  const postId = req.params.postId;
  // url로 전달받은 유저
  const userId = req.params.userId;

  // 좋아요가 눌린 게시글(post)
  const post = await Post.findOne({ _id: postId });
  // 좋아요를 누른 사람(provider)
  const provider = await User.findOne({ _id: userId });

  // 찾은 정보로 body 구성
  const body = {
    user: post.user,
    provider: provider._id,
    post: post._id,
    isChecked: false,
  };

  // 내가 아닌 다른 사람이 좋아요를 눌렀을 때
  if (post.user.toString() != provider._id.toString()) {
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
  // 알림을 담을 배열
  var notiArray = [];
  // url로 전달받은 user id 가져오기 (현재 접속중인 user)
  const userId = req.params.userId;
  // userId user가 받은 알림 가져오기
  Notification.find({ user: userId }, async (err, notification) => {
    if (!notification) return res.send({ err });

    for (i = 0; i < notification.length; i++) {
      // 알림을 보낸 사람 찾기(provider)
      const provider = await User.findOne(
        { _id: notification[i].provider },
        (err, provider) => {
          return provider;
        }
      );
      // 댓글 알림이면
      if (notification[i].comment != null) {
        console.log("댓글");
        // 댓글이 달린 게시물 찾기(post)
        Post.findOne({ _id: "" + notification[i].post }, (err, post) => {
          if (!post) return res.send({ err });
          // 댓글 내용 찾기(comment)
          Comment.find({ post: post._id }, (err, comment) => {
            if (!comment) return res.send({ err });
            for (i = 0; i < comment.length; i++) {
              if (comment[i].user == provider._id) {
                console.log(comment[i]);
              }
            }
          });
          // Comment.find({ user: provider._id }, (err, comment) => {
          //   if (!comment) return res.send({ err });
          //   for (i = 0; i < comment.length; i++) {
          //     if ((comment[i].post = post._id)) {
          //       re = {
          //         provider: provider.name,
          //         isWezzle: post.isWezzle,
          //         content: comment[i].text,
          //         occurTime: notification[i].occurTime,
          //         menuType: "comment",
          //       };
          //       notiArray.push(re);
          //     }
          //   }
          // });
        });
      } else {
        console.log("좋아용");
        // 좋아요나 협업 눌린 게시물 찾기(post)
        Post.findOne({ _id: "" + notification[i].post }, (err, post) => {
          if (!post) return res.send({ err });
          // 협업해요 알림이면
          // if (post.isWezzle) {
          //   console.log(
          //     provider.name,
          //     post.title,
          //     post.isWezzle,
          //     notification[i].occurTime,
          //     "wezzle"
          //   );
          //   re = {
          //     provider: provider.name,
          //     content: post.title,
          //     isWezzle: post.isWezzle,
          //     occurTime: notification[i].occurTime,
          //     menuType: "wezzle",
          //   };
          //   notiArray.push(re);
          // } else {
          //   // 좋아요 알림이면
          //   console.log(
          //     provider.name,
          //     post.title,
          //     post.isWezzle,
          //     // notification[i].occurTime,
          //     "like"
          //   );
          //   re = {
          //     provider: provider.name,
          //     content: post.title,
          //     isWezzle: post.isWezzle,
          //     // occurTime: notification[i].occurTime,
          //     menuType: "like",
          //   };
          //   notiArray.push(re);
          // }
        }).catch((err) => {
          res.json({
            message: "Post find 에러 발생",
          });
        });
      }
    }
  }).then(() => {
    // return res.status(200).send(notiArray);
    console.log(notiArray);
  });
});

module.exports = router;

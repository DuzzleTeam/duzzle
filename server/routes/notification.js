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
router.get(`/notification/:userId`, async (req, res) => {
  // 알림을 담을 배열
  var notiArray = [];
  // url로 전달받은 user id 가져오기 (현재 접속중인 user)
  const userId = req.params.userId;
  // userId user가 받은 알림 가져오기
  await Notification.find({ user: userId }, async (err, notification) => {
    if (!notification) return res.send({ message: "알림 없음" });

    for (i = 0; i < notification.length; i++) {
      // 30일 이상 지난 알림은 삭제
      if (
        new Date().getTime() - notification[i].occurTime.getTime() >=
        2592000000
      ) {
        await Notification.deleteOne(notification[i]);
      }
      // 알림을 보낸 사람 찾기(provider)
      const provider = await User.findOne(
        { _id: notification[i].provider },
        (err, provider) => {
          // 탈퇴한 사용자 처리
          if (!provider) return { name: "탈퇴한 사용자" };
          return provider;
        }
      );

      // 댓글 알림이면
      if (notification[i].comment != null) {
        // 댓글이 달린 게시물 찾기(post)
        const post = await Post.findOne(
          { _id: "" + notification[i].post },
          (err, post) => {
            return post;
          }
        );

        // 댓글 내용 찾기(comment)
        const comment = await Comment.findById(
          notification[i].comment,
          (err, comment) => {
            return comment;
          }
        );
        // 게시글과 댓글이 있다면(삭제되지 않았다면)
        if (post != null && comment != null) {
          const re = {
            provider: {
              name: provider.name,
              email: provider.email,
            },
            isWezzle: post.isWezzle,
            content: comment.text,
            post: post._id,
            occurTime: comment.createdAt,
            isChecked: notification[i].isChecked,
            notiId: notification[i]._id.toString(),
            menuType: "comment",
          };
          notiArray.unshift(re);
        }
        // 좋아요나 협업해요 알림이면
      } else {
        // 좋아요나 협업 눌린 게시물 찾기(post)
        const post = await Post.findOne(
          { _id: "" + notification[i].post },
          (err, post) => {
            return post;
          }
        );
        //게시글이 있다면
        if (post != null) {
          // 협업해요 알림이면
          if (post.isWezzle) {
            const re = {
              provider: {
                name: provider.name,
                email: provider.email,
              },
              content: post.title,
              post: post._id,
              isWezzle: post.isWezzle,
              occurTime: notification[i].occurTime,
              isChecked: notification[i].isChecked,
              notiId: notification[i]._id.toString(),
              menuType: "wezzle",
            };
            notiArray.unshift(re);
          } else {
            // 좋아요 알림이면
            const re = {
              provider: {
                name: provider.name,
                email: provider.email,
              },
              content: post.title,
              post: post._id,
              isWezzle: post.isWezzle,
              occurTime: notification[i].occurTime,
              isChecked: notification[i].isChecked,
              notiId: notification[i]._id.toString(),
              menuType: "like",
            };
            notiArray.unshift(re);
          }
        }
      } // end of if(댓글 좋아요 구분)
    } // end of for
    return res.status(200).send(notiArray);
  }); // end of Notification
});

// 알림 확인
router.get("/check/notification/:notiId", (req, res) => {
  // url로 전달받은 notification id 가져오기
  const notiId = req.params.notiId;
  Notification.findOneAndUpdate(
    { _id: notiId },
    { isChecked: true },
    (err, noti) => {
      if (err) return res.json({ checked: false, message: err });
      return res.json({ checked: true });
    }
  );
});

module.exports = router;

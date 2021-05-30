const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

const { auth } = require("../middleware/auth");
const { setCommentUser } = require("../functions/comment");

// 댓글 작성 (chohadam, 2021-04-17)
router.post("/post/:postId/comment", auth, (req, res) => {
  // 사용자가 입력한 댓글 body data를 기반으로 Comment 생성
  const comment = new Comment(req.body);

  // 현재 유저를 댓글 작성자로 저장
  comment.user = req.user;

  // url로 넘어온 post id 가져오기
  const { postId } = req.params;
  // post id를 기반으로 Post 하나 찾기
  Post.findById(postId, (err, post) => {
    if (err) {
      // post를 찾지 못했거나 에러 발생 시
      return res.json({ err });
    }

    // post를 찾았다면
    // 댓글의 post에 현재 post 설정
    comment.post = post;

    // 댓글을 MongoDB에 저장
    comment.save((err, commentInfo) => {
      // 에러 발생 시
      if (err) {
        return res.json({ err });
      }
    });

    // 성공적으로 댓글 저장 시 클라이언트로 전송
    return res.status(200).send({ comment });
  });
});

// 댓글들 가져오기 (chohadam, 2021-05-29)
router.get("/post/:postId/comments", (req, res) => {
  // url로 넘어온 post id 가져오기
  const { postId } = req.params;

  // 현재 post에 속한 comment들 찾기
  Comment.find({ post: postId }, async (err, comments) => {
    // 댓글을 찾지 못했다면
    if (err) return res.json({ success: false, err });

    // 댓글들을 성공적으로 찾았다면
    // 댓글 유저 정보 셋팅
    const newComments = [];
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      // user 정보 포함 새로운 comment
      const newComment = await setCommentUser(comment);
      // 추가
      newComments.push(newComment);
    }

    // 클라이언트에 전송
    return res.status(200).json({ comments: newComments });
  });
});

// delete comment (chohadam, 2021-04-19)
router.delete("/comment/:commentId", (req, res) => {
  // url로 넘어온 comment id 가져오기
  const { commentId } = req.params;

  // comment id를 기반으로 comment 삭제
  Comment.findByIdAndDelete(commentId, (err) => {
    if (err) return res.json({ success: false, err });
  });

  // 정상적으로 삭제 시 클라이언트에 전송
  return res.status(200).send({ deleteCommentSuccess: true });
});

// edit comment (chohadam, 2021-04-19)
router.patch("/comment/:commentId", (req, res) => {
  // url로 넘어온 comment id 가져오기
  const { commentId } = req.params;

  // 수정하려고 하는 텍스트
  const { text } = req.body;

  // comment id에 해당하는 댓글을 수정
  Comment.findByIdAndUpdate(commentId, { text }, (err) => {
    // 에러 발생 시 클라이언트에 실패 전송
    if (err) return res.json({ success: false, err });

    // 정상적으로 수정 시 클라이언트에 성공 전송
    return res.status(200).send({ updateCommentSuccess: true });
  });
});

// 댓글 좋아요 버튼 클릭 시
router.patch("/like/:commentId", auth, (req, res) => {
  // url로 넘어온 comment id 가져오기
  const { commentId } = req.params;

  // 현재 접속 유저
  const { user } = req;
  // comment id에 해당하는 댓글
  Comment.findById(commentId, async (err, comment) => {
    if (err) return res.json({ success: false, err });

    const likeIndex = comment.like.indexOf(user.email);
    // 좋아요를 누른 적이 없다면
    if (likeIndex === -1) {
      comment.like.push(user.email);
    } else {
      // 좋아요를 누른 적이 있다면 좋아요 취소
      comment.like.splice(likeIndex, 1);
    }
    const newComment = await comment.save();

    return res
      .status(200)
      .send({ updateCommentSuccess: true, like: newComment.like });
  });
});

module.exports = router;

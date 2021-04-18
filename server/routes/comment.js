const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

// 댓글 작성 (chohadam, 2021-04-17)
router.post("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  // 사용자가 입력한 댓글 body data를 기반으로 Comment 생성
  const comment = new Comment({ ...req.body });

  // url로 넘어온 post id 가져오기
  const { postId } = req.params;
  // post id를 기반으로 Post 하나 찾기
  Post.findById(postId, (err, post) => {
    if (err) {
      // post를 찾지 못했거나 에러 발생 시
      return res.json({ success: false, err });
    }

    // post를 찾았다면
    // 댓글의 post에 현재 post 설정
    comment.post = post;

    // 댓글을 MongoDB에 저장
    comment.save((err, commentInfo) => {
      // 에러 발생 시
      if (err) {
        return res.json({ success: false, err });
      }
    });

    // 성공적으로 댓글 저장 시 클라이언트로 전송
    return res.status(200).send({ createCommentSuccess: true });
  });
});

// 게시글 열람 (chohadam, 2021-04-19)
router.get("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  // url로 넘어온 post id 가져오기
  const { postId } = req.params;
  // post id를 기반으로 post 하나 찾기
  Post.findById(postId, (err, post) => {
    // 에러 발생 시
    if (err) {
      return res.json({ success: false, err });
    }

    // 성공적으로 post를 찾으면
    // 현재 post에 속한 comment들 찾기
    Comment.find({ post }, (err, comments) => {
      // 댓글을 찾지 못했다면
      if (err) return res.json({ success: false, err });

      // 댓글들을 성공적으로 찾았다면 클라이언트에 전송
      return res.json({ gettingCommentSuccess: true, comments });
    });
  });
});

router.delete("/:type(wezzle|mezzle)/comment/:commentId", (req, res) => {
  // url로 넘어온 comment id 가져오기
  const { commentId } = req.params;

  // comment id를 기반으로 comment 삭제
  Comment.findByIdAndDelete(commentId, (err) => {
    if (err) return res.json({ success: false, err });
  });

  // 정상적으로 삭제 시 클라이언트에 전송
  return res.status(200).send({ deleteCommentSuccess: true });
});

module.exports = router;

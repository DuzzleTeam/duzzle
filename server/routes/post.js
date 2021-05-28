const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

// 게시물 작성 (dayeon-choi, 2021-04-19)
router.post("/:type(wezzle|mezzle)/write", auth, (req, res) => {
  // 사용자가 작성한 게시글 데이터로 Post 생성
  const post = new Post(req.body);
  post.user = req.user;

  post.save((err, postInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
  });

  return res.status(200).send({ createPostSuccess: true });
});

//게시글 삭제 (dayeon-choi, 2021-04-25)
router.delete("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  const { postId } = req.params;
  Post.deleteOne({ _id: postId }, (err) => {
    if (err) {
      return res.json({ deletePostSuccess: false, message: err });
    }

    res.json({ deletePostSuccess: true });
  });
});

module.exports = router;

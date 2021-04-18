const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

// 댓글 작성 (chohadam, 2021-04-17)
router.post("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  const comment = new Comment({ ...req.body });

  const { postId } = req.params;
  Post.findById(postId, (err, post) => {
    if (err) {
      return res.json({ success: false, err });
    }

    comment.post = post;

    comment.save((err, commentInfo) => {
      if (err) {
        return res.json({ success: false, err });
      }
    });

    return res.status(200).send({ createCommentSuccess: true });
  });
});

// 게시글 열람 (chohadam, 2021-04-19)
router.get("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findById(postId, (err, post) => {
    if (err) {
      return res.json({ success: false, err });
    }

    Comment.find({ post }, (err, comments) => {
      if (err) return res.json({ success: false, err });

      return res.json({ gettingCommentSuccess: true, comments });
    });
  });
});

module.exports = router;

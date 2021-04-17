const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");

// 댓글 작성 (chohadam, 2021-04-17)
router.post("/:type(wezzle|mezzle)/post/:postId", (req, res) => {
  const comment = new Comment({ ...req.body });

  const { postId } = req.params;
  Post.findById(postId, (err, post) => {
    comment.post = post;

    comment.save((err, commentInfo) => {
      if (err) {
        return res.json({ success: false, err });
      }
    });

    return res.status(200).send({ createCommentSuccess: true, comment });
  });
});

module.exports = router;

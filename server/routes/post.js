const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");

const { auth } = require("../middleware/auth");
const { getUser } = require("../functions/auth");

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

// 게시글 열람 (chohadam, 2021-04-19)
router.get("/:type(wezzle|mezzle)/post/:postId", async (req, res) => {
  // url로 넘어온 post id 가져오기
  const { postId } = req.params;

  // post id를 기반으로 post 하나 찾기
  // lean(): POJO로 반환
  // https://velog.io/@modolee/mongodb-document-to-javascript-object
  const post = await Post.findOne({ _id: postId }).lean();
  // post가 없을 시
  if (!post) {
    return res.json({ success: false });
  }

  // 게시글을 성공적으로 찾았다면
  // user 정보 가져오기
  const user = await getUser(post.user);

  // user 정보를 포함한 새로운 post 객체
  const newPost = {
    ...post,
    user,
  };

  // 클라이언트에 전송
  return res.status(200).json({ post: newPost });
});

module.exports = router;

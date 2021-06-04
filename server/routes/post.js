const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { getUser } = require("../functions/auth");
const { setPostUser } = require("../functions/post");

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

// 게시글 삭제 (dayeon-choi, 2021-04-25)
// (chohadam, 2021-05)
router.delete("/post/:postId", (req, res) => {
  // url에서 post id 받아오기
  const { postId } = req.params;
  // 해당 포스트 삭제
  Post.deleteOne({ _id: postId }, (err) => {
    // 에러 발생 시 클라이언트에 에러 전송
    if (err) {
      return res.json({ err });
    }

    // 삭제 성공 시 클라이언트에 status 200 전송
    return res.sendStatus(200);
  });
});

// 게시글 열람 (chohadam, 2021-04-19)
router.get("/post/:postId", async (req, res) => {
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

// 전체 게시글 가져오기
router.get(`/:type`, async (req, res) => {
  // 가져오려고 하는 게시글 타입 (wezzle or mezzle)
  const { type } = req.params;
  // 위즐인지
  const isWezzle = type === "wezzle";

  // 전체 게시글 가져오기 (POJO로)
  const posts = await Post.find({ isWezzle }).sort({ createdAt: -1 }).lean();

  if (posts) {
    // 게시글이 존재한다면
    // 각 게시글에 해당하는 작성자 셋팅
    const newPosts = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      // user 정보 포함 새로운 post
      const newPost = await setPostUser(post);
      // 추가
      newPosts.push(newPost);
    }

    // 클라이언트에 전송
    return res.status(200).json({ posts: newPosts });
  }
});

// 05.30 내 게시물 가져오기
// modify 2021-06-02 (chohadam)
router.get("/posts/:email", async (req, res) => {
  // email 가져오기
  const { email } = req.params;
  // email로 유저 찾기
  const user = await User.findOne({ email });

  // 유저가 없다면
  if (!user) {
    return res.send();
  }

  // 유저가 있다면
  // user와 관련된 post들 찾기 (POJO)
  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .lean();
  // 게시글이 없다면
  if (posts.length === 0) return res.send({ posts: null });

  // 게시글이 있다면 user 정보 셋팅
  const newPosts = [];
  posts.forEach((post) => {
    newPosts.push({
      ...post,
      user,
    });
  });
  // 클라이언트에 게시글 전송
  return res.status(200).send({
    posts: newPosts,
  });
});

module.exports = router;

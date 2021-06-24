const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { Notification } = require("../models/Notification");

const { auth, level } = require("../middleware/auth");
const { getUser } = require("../functions/auth");
const { setPostUser } = require("../functions/post");

// 게시물 작성 (dayeon-choi, 2021-04-19)
// 게시물의 생성된 id 얻기 (dayeon-choi, 2021-06-17)
router.post(
  "/:type(wezzle|mezzle)/write",
  auth,
  level("post", true),
  (req, res) => {
    // 사용자가 작성한 게시글 데이터로 Post 생성
    const post = new Post(req.body);
    post.user = req.user;

    post.save((err, postInfo) => {
      if (err) {
        return res.status(500).json({ success: false, err });
      } else {
        // 콜백의 postInfo를 통해 생성된 _id 얻음
        return res.status(200).send({ post: postInfo });
      }
    });
  }
);

router.patch("/post/:postId", async (req, res) => {
  // url로 넘어온 comment id 가져오기
  const { postId } = req.params;

  // 수정하려고 하는 정보
  const data = req.body;

  try {
    // post id에 해당하는 게시글을 수정
    const result = await Post.updateOne({ _id: postId }, data);

    if (result.ok) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(500);
    }
  } catch (e) {
    console.log(e);
  }
});

// 게시글 삭제 (dayeon-choi, 2021-04-25)
// (chohadam, 2021-05)
router.delete("/post/:postId", auth, level("post", false), (req, res) => {
  // url에서 post id 받아오기
  const { postId } = req.params;

  // (juhyun-noh) 게시글 삭제하면 해당 게시글 관련 알림 삭제
  Notification.deleteMany({ post: postId }, (err) => {
    if (err) {
      console.log("알림 삭제 오류", err);
    }
  });

  // 해당 포스트 삭제
  Post.deleteOne({ _id: postId }, (err) => {
    // 에러 발생 시 클라이언트에 에러 전송
    if (err) {
      return res.status(500).json({ err });
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
    return res.status(404).json({ message: "게시글이 없습니다." });
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
    return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
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

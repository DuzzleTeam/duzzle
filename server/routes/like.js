const express = require("express");
const router = express.Router();

const { Post } = require("../models/Post");
const { Like } = require("../models/Like");

const { auth } = require("../middleware/auth");

// 게시글 좋아요 버튼 클릭 시
router.post("/like/:postId", auth, async (req, res) => {
  // 현재 접속 유저
  const { user } = req;

  // url로 넘어온 post id 가져오기
  const { postId } = req.params;
  // post id에 해당하는 댓글
  const post = await Post.findOne({ _id: postId });

  // 현 유저가 현 포스트에 누른 좋아요가 있는지
  const like = await Like.findOne({ user, post });
  if (like) {
    // 있다면
    // 삭제 (좋아요 취소)
    const result = await Like.deleteOne({ user, post });

    // post 좋아요도 설정
    const likeIndex = post.like.indexOf(user.email);
    // 좋아요를 누른 적이 있다면 좋아요 취소
    post.like.splice(likeIndex, 1);

    try {
      // post 저장
      await post.save();

      // like 삭제 성공 시 status 200
      if (result.ok) {
        return res.status(200).json({ like: post.like });
      } else {
        // 삭제 실패 시
        return res.json({ result });
      }
    } catch (e) {
      // post save 실패 시
      return res.json({ e });
    }
  } else {
    // 없다면
    // 좋아요 생성
    const like = new Like({
      user,
      post,
    });

    // post 좋아요도 설정
    post.like.push(user.email);

    try {
      // 저장
      await like.save();
      await post.save();

      // 클라이언트에 전송
      return res.status(200).json({ like: post.like });
    } catch (e) {
      // 저장 실패
      return res.json({ e });
    }
  }
});

module.exports = router;

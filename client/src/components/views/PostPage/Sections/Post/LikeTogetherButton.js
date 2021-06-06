import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import "./LikeTogetherButton.css";

function LikeTogetherButton({ setPost, post }) {
  // 현재 접속 유저 정보
  const user = useSelector((state) => state.user.authPayload);

  // like or 협업 버튼 클릭 시
  const onClickLike = async (e) => {
    // 요청 보낼 url
    const url = `/api/like/${post._id}`;
    // post 방식 요청
    const res = await axios.post(url);

    if (res.status === 200) {
      // 요청 성공 시
      setPost({ ...post, like: res.data.like });

      // (juhyun-noh)
      // 좋아요 저장을 했으면
      if (res.data.save) {
        // 알림 보내기
        await axios.get(`/api/notification/${post._id}/${user._id}`);
      }
    }
  };

  // 눌려있는지 체크
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    // 좋아요 눌렀었는지 판별
    setIsLiked(post.like.includes(user.email));
  }, [post, user]);

  return (
    <button
      className={isLiked ? "PostLikeButton PostLikedButton" : "PostLikeButton"}
      onClick={onClickLike}
    >
      {post.isWezzle ? (
        <>
          <img
            src={
              isLiked
                ? "/images/postPage/post_together_sel.png"
                : "/images/postPage/post_together.png"
            }
            alt="likebutton"
          />
          {"협업해요"}
        </>
      ) : (
        <>
          <img
            src={
              isLiked
                ? "/images/postPage/post_like_sel.png"
                : "/images/postPage/post_like.png"
            }
            alt="likebutton"
          />
          {"좋아요"}
        </>
      )}
    </button>
  );
}

export default LikeTogetherButton;

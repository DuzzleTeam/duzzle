import axios from "axios";
import React from "react";

function LikeTogetherButton({ setPost, postId, isWezzle }) {
  // like or 협업 버튼 클릭 시
  const onClickLike = async (e) => {
    // 요청 보낼 url
    const url = `/api/like/${postId}`;
    // post 방식 요청
    const res = await axios.post(url);

    if (res.status === 200) {
      // 요청 성공 시
      setPost((post) => {
        return { ...post, like: res.data.like };
      });
    }
  };

  return (
    <button onClick={onClickLike}>
      {isWezzle ? (
        <>
          <img src="/images/postPage/post_together.png" alt="likebutton" />
          협업해요
        </>
      ) : (
        <>
          <img src="/images/postPage/post_like.png" alt="likebutton" />
          좋아요
        </>
      )}
    </button>
  );
}

export default LikeTogetherButton;

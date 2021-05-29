import React from "react";

function LikeTogetherButton({ isWezzle }) {
  return (
    <button>
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

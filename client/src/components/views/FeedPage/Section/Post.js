import React, { useEffect, useState } from "react";

import "./Post.css";

// 피드에 있는 게시글 미리보기 하나 하나의 컴포넌트
function Post(props) {
  // 현재 게시글
  const [post, setPost] = useState(props.post);

  // post가 달라지면 실행
  useEffect(() => {
    // post 자체가 다른 것이면 새로 post 셋팅
    if (post._id !== props.post._id) {
      setPost(props.post);
    }
  }, [props.post, post._id]);

  return (
    <article>
      {/* 이미지가 있는지 없는지에 따라 기본 이미지 or 이미지 출력 */}

      {/* 타이틀 */}
      <span>{post.title}</span>

      <div className="PostInformation">
        {/* 작성자 */}

        {/* 하트 수 */}

        {/* 댓글 수 */}
      </div>
    </article>
  );
}

export default Post;

import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./NonePosts.css";

// 게시글이 없을 때
function NonePosts({ postType }) {
  // 협업인지 컨펌인지
  const description = postType === "wezzle" ? "협업" : "컨펌";

  return (
    // 컨테이너
    <article className={"NonePostsContainer"}>
      {/* 빈 폴더 사진 */}
      <img src="/images/feedPage/empty_folder.png" alt="" />

      {/* 게시글 없다는 설명 글 */}
      <span>
        {`앗! ${description} 게시글이 없어요.`}
        <br />
        {`${description} 글을 작성하러 가볼까요?`}
      </span>

      {/* 작성하러 가기 버튼 */}
      <Link to={`/${postType}/write`}>{`${description} 글 작성하기`}</Link>
    </article>
  );
}

export default NonePosts;

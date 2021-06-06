import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./NonePosts.css";

// 게시글이 없을 때
function NonePosts({ link, type, description, go }) {
  return (
    // 컨테이너
    <article className={"NonePostsContainer"}>
      {/* 빈 폴더 사진 */}
      <img src="/images/feedPage/empty_folder.png" alt="" />

      {/* 게시글 없다는 설명 글 */}
      <span>
        {`앗! ${type} 게시글이 없어요.`}
        <br />
        {`${description}`}
      </span>

      {/* 작성하러 가기 버튼 */}
      <Link to={link}>{`${go}하러 가기`}</Link>
    </article>
  );
}

export default NonePosts;

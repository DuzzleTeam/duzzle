import React from "react";
import { Link } from "react-router-dom";

import "./NonePosts.css";

const NonePosts = ({ type }) => {
  const title = type === "wezzle" ? "협업" : "컨펌";
  return (
    <article className={"NonePostsContainer"}>
      <img src="/images/feedPage/empty_folder.png" alt="" />

      <span>
        앗! {title} 게시글이 없어요.
        <br />
        {title} 글을 작성하러 가볼까요?
      </span>

      <Link to={`/${type}/write`}>{title} 글 작성하러 가기</Link>
    </article>
  );
};

export default NonePosts;

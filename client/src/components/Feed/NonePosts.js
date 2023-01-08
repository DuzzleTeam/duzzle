import React from "react";
import { Link } from "react-router-dom";

import "./NonePosts.css";

function NonePosts({ link, type, description, go }) {
  return (
    <article className={"NonePostsContainer"}>
      <img src="/images/feedPage/empty_folder.png" alt="" />

      <span>
        {`앗! ${type} 게시글이 없어요.`}
        <br />
        {`${description}`}
      </span>

      <Link to={link}>{`${go}하러 가기`}</Link>
    </article>
  );
}

export default NonePosts;

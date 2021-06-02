import React from "react";

function PostInfo({ infoName, info }) {
  return (
    <li>
      {infoName}
      <span className="PostInfoData">{info}</span>
    </li>
  );
}

export default PostInfo;

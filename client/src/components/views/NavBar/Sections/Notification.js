import React from "react";
import { Link } from "react-router-dom";

function Notification(props) {
  const { notification } = props;
  const message = {
    comment: "님이 댓글을 남겼습니다.",
    like: "님이 회원님의 게시물을 좋아합니다.",
    wezzle: "님이 협업을 신청했습니다.",
  };
  return (
    <Link to={"/"} className="NotiContainer">
      <div className="NotiTopContainer">
        <div className="NotiLeftContainer">
          <span className="NotiProvider">{notification.provider}</span>
          <div className="NotiDesc">
            {notification.post.isWezzle ? "위즐" : "미즐"}
            {" │ "}
            {notification.post.title.slice(0, 9) + ".."}
          </div>
        </div>
        <span className="NotiTime">{notification.occurTime}</span>
      </div>
      <span className="NotiContent">
        {notification.provider +
          message[notification.menuType] +
          " 확인해보세요!"}
      </span>
    </Link>
  );
}

export default Notification;

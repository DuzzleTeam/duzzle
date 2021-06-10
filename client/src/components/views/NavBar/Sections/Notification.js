import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Notification.css";

function Notification({ notification }) {
  const message = {
    comment: "님이 댓글을 남겼습니다.",
    like: "님이 회원님의 게시물을 좋아합니다.",
    wezzle: "님이 협업을 신청했습니다.",
  };

  const goPost = () => {
    if (notification.isWezzle) {
      document.location.href = `/wezzle/post/${notification.post}`;
    } else {
      document.location.href = `/mezzle/post/${notification.post}`;
    }
  };

  useEffect(() => {
    console.log(notification);
  }, [notification]);

  return (
    <Link
      onClick={() => goPost()}
      to={"/"}
      className={
        notification.isChecked
          ? "NotiContainer"
          : "NotiContainer NotiNotChecked"
      }
    >
      <div className="NotiTopContainer">
        <div className="NotiLeftContainer">
          <span className="NotiProvider">{notification.provider}</span>
          <div className="NotiDesc">
            {notification.isWezzle ? "위즐" : "미즐"}
            {" │ "}
            {notification.content.slice(0, 11) + ".."}
          </div>
        </div>
        <span className="NotiTime">{notification.occurTime.slice(0, 10)}</span>
      </div>
      <span className="NotiContent">
        {notification.provider +
          message[notification.menuType] +
          " 확인해보세요!"}
      </span>
      <div className="NotiDivider"></div>
    </Link>
  );
}

export default Notification;

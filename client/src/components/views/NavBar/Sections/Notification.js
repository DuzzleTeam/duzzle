import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./Notification.css";

function Notification({ notification }) {
  const message = {
    comment: "님이 댓글을 남겼습니다.",
    like: "님이 회원님의 게시물을 좋아합니다.",
    wezzle: "님이 협업을 신청했습니다.",
  };

  const goPost = () => {
    // 협업해요 알림이면
    if (notification.menuType === "wezzle") {
      axios.get(`/api/check/notification/${notification.notiId}`);
      // 협업해요 누른 사람의 프로필로 이동
      document.location.href = `/users/${notification.provider.email}`;
      // 좋아요나 댓글 알림이면
    } else {
      // 위즐 or 미즐 구분
      if (notification.isWezzle) {
        // isChecked값 true로 변경
        axios.get(`/api/check/notification/${notification.notiId}`);
        document.location.href = `/wezzle/post/${notification.post}`;
      } else {
        axios.get(`/api/check/notification/${notification.notiId}`);
        document.location.href = `/mezzle/post/${notification.post}`;
      }
    }
  };

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
          <span className="NotiProvider">{notification.provider.name}</span>
          <div className="NotiDesc">
            {notification.isWezzle ? "위즐" : "미즐"}
            {" │ "}
            {notification.content.slice(0, 11) + ".."}
          </div>
        </div>
        <span className="NotiTime">{notification.occurTime.slice(0, 10)}</span>
      </div>
      <span className="NotiContent">
        {notification.provider.name +
          message[notification.menuType] +
          " 확인해보세요!"}
      </span>
      <div className="NotiDivider"></div>
    </Link>
  );
}

export default Notification;

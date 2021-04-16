import React, { useEffect, useState } from "react";

import Notification from "./Notification";

import "./NotificationDropdown.css";

function NotificationDropdown(props) {
  const [notification, setNotification] = useState({
    provider: "조하닮",
    post: { title: "테이블이 좀 이상해요.", isWezzle: false },
    isChecked: false,
    occurTime: new Date().toISOString().slice(0, 10).replace(/\-/g, "."),
    menuType: "comment",
  });
  useEffect(() => {}, [notification]);
  return (
    <div
      className={
        props.openingNoti
          ? "NotiDropContainer OpeningDropdown"
          : "NotiDropContainer"
      }
    >
      <h3>알림</h3>
      <ul className="NotiMenu">
        <li>댓글</li>
        <li>좋아요</li>
        <li>협업해요</li>
      </ul>
      <ul className="NotiContentsContainer">
        <Notification notification={notification} />
      </ul>
    </div>
  );
}

export default NotificationDropdown;

import React, { useEffect, useState } from "react";

import Notification from "./Notification";

function NotificationDropdown() {
  const [notification, setNotification] = useState({
    provider: "조하닮",
    post: { title: "테이블이 좀 이상해요.", isWezzle: false },
    isChecked: false,
    occurTime: Date.now(),
  });
  useEffect(() => {}, [notification]);
  return (
    <div className="NotiDropContainer">
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

import React from "react";
import { Link } from "react-router-dom";

function Notification(props) {
  const { notification } = props;
  return (
    <Link to={"/"} className="NotiContainer">
      <img src="/images/profile-image.jpg" alt="profileImage" />
      <div className="NotiTitle">
        <div className="LeftNotiTitle">
          <span className="NotiProvider">{notification.provider}</span>
          <div className="NotiDesc">
            {notification.post.isWezzle ? "협업" : "피드백"}
            {" │ "}
            {notification.post.title.slice(0, 9) + ".."}
          </div>
        </div>
        <span className="NotiTime">{notification.occurTime}</span>
      </div>
      <span className="NotiContent"></span>
    </Link>
  );
}

export default Notification;

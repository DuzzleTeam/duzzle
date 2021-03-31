import React from "react";
import { Link } from "react-router-dom";

import "./AuthMenu.css";

// login button or user profile (chohadam, 2021-03-31)
function AuthMenu(props) {
  return (
    <div id="AuthMenu">
      {/* 로그인 되었는지 */}
      {props.isAuth ? (
        // notification and profile image
        <div className="ProfileMenu">
          <button className="RightButton NotificationButton">
            <img src="" alt="notification" />
          </button>
          <button className="RightButton ProfileButton">
            <img src="images/profile-image.jpg" alt="profileImage" />
          </button>
        </div>
      ) : (
        // login button
        <Link to="login">로그인</Link>
      )}
    </div>
  );
}

export default AuthMenu;

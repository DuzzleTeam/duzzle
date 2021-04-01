import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./AuthMenu.css";

// login button or user profile (chohadam, 2021-03-31)
function AuthMenu(props) {
  const [openingDropdown, setOpeningDropdown] = useState(false);
  const profileDropdownHandler = (e) => {
    setOpeningDropdown(!openingDropdown);
  };
  return (
    <div id="AuthMenu">
      {/* 로그인 되었는지 */}
      {props.isAuth ? (
        // notification and profile image
        <div className="RightMenuContainer">
          {/* Notification */}
          <div className="NoticiationContaier">
            <button className="RightButton NotificationButton">
              <img src="images/notification.png" alt="notification" />
            </button>
          </div>
          {/* Profile */}
          <div className="ProfileContiner">
            <button
              className="RightButton ProfileButton"
              onClick={profileDropdownHandler}
            >
              <img src="images/profile-image.jpg" alt="profileImage" />
            </button>
            <ul
              className={`ProfileDropdown ${
                openingDropdown ? "OpeningDropdown" : ""
              }`}
            >
              <li>
                <Link to="/auth/mypage">마이페이지</Link>
              </li>
              <div className="divider"></div>
              <li>
                <Link to="/auth/logout">로그아웃</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // login button
        <Link to="/auth/login">로그인</Link>
      )}
    </div>
  );
}

export default AuthMenu;
